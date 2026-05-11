import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button.js";
import { Input } from "@/components/ui/input.js";
import { Label } from "@/components/ui/label.js";
import { toast } from "@/hooks/use-toast.js";
import { useGoldPriceStore } from "@/store/goldPriceStore.js";
import { updateGoldPrice } from "@jwell/api-client";
import type { GoldPrice } from "@jwell/types";
import { ADMIN_API_URL, ADMIN_API_KEY } from "@/lib/api-config.js";

const API_URL = ADMIN_API_URL;
const ADMIN_KEY = ADMIN_API_KEY ?? "";

const schema = z.object({
  goldPricePerGram: z.coerce.number().positive("Must be a positive number"),
  silverPricePerGram: z.coerce.number().positive("Must be a positive number"),
  diamondPricePerGram: z.coerce.number().positive("Must be a positive number"),
});
type FormData = z.infer<typeof schema>;

interface Props {
  currentPrice?: GoldPrice;
}

export default function GoldPriceForm({ currentPrice }: Props) {
  const queryClient = useQueryClient();
  const { setOptimisticRates, clearOptimisticRates } = useGoldPriceStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      goldPricePerGram: currentPrice && currentPrice.goldPricePerGram > 0 ? currentPrice.goldPricePerGram : undefined,
      silverPricePerGram: currentPrice && currentPrice.silverPricePerGram > 0 ? currentPrice.silverPricePerGram : undefined,
      diamondPricePerGram: currentPrice && currentPrice.diamondPricePerGram > 0 ? currentPrice.diamondPricePerGram : undefined,
    },
  });

  useEffect(() => {
    if (currentPrice) {
      reset({
        goldPricePerGram: currentPrice.goldPricePerGram,
        silverPricePerGram: currentPrice.silverPricePerGram,
        diamondPricePerGram: currentPrice.diamondPricePerGram,
      });
    }
  }, [currentPrice, reset]);

  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      updateGoldPrice(API_URL, data, ADMIN_KEY),
    onMutate: (data) => setOptimisticRates(data),
    onSuccess: () => {
      clearOptimisticRates();
      queryClient.invalidateQueries({ queryKey: ["gold-price"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({ title: "Metal rates updated", description: "Gold, silver and diamond product prices were recalculated." });
    },
    onError: (err) => {
      clearOptimisticRates();
      toast({
        variant: "destructive",
        title: "Update failed",
        description: err instanceof Error ? err.message : "Something went wrong.",
      });
    },
  });

  return (
    <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="flex flex-col gap-5 max-w-sm">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="goldPricePerGram">Gold Rate (₹ per gram)</Label>
        <Input
          id="goldPricePerGram"
          type="number"
          step="0.01"
          placeholder="e.g. 9450"
          {...register("goldPricePerGram")}
        />
        {errors.goldPricePerGram && (
          <p className="text-xs text-red-500 mt-1">{errors.goldPricePerGram.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="silverPricePerGram">Silver Rate (₹ per gram)</Label>
        <Input
          id="silverPricePerGram"
          type="number"
          step="0.01"
          placeholder="e.g. 110"
          {...register("silverPricePerGram")}
        />
        {errors.silverPricePerGram && (
          <p className="text-xs text-red-500 mt-1">{errors.silverPricePerGram.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="diamondPricePerGram">Diamond Rate (₹ per gram)</Label>
        <Input
          id="diamondPricePerGram"
          type="number"
          step="0.01"
          placeholder="e.g. 65000"
          {...register("diamondPricePerGram")}
        />
        {errors.diamondPricePerGram && (
          <p className="text-xs text-red-500 mt-1">{errors.diamondPricePerGram.message}</p>
        )}
      </div>
      <Button type="submit" disabled={mutation.isPending} className="self-start">
        {mutation.isPending && <Loader2 size={14} className="animate-spin" />}
        Update Metal Rates
      </Button>
    </form>
  );
}
