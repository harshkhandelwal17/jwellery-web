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

const API_URL = import.meta.env.VITE_API_URL as string;
const ADMIN_KEY = import.meta.env.VITE_ADMIN_API_KEY as string;

const schema = z.object({
  pricePerGram: z.coerce.number().positive("Must be a positive number"),
});
type FormData = z.infer<typeof schema>;

interface Props {
  currentPrice?: GoldPrice;
}

export default function GoldPriceForm({ currentPrice }: Props) {
  const queryClient = useQueryClient();
  const { setOptimisticPrice, clearOptimisticPrice } = useGoldPriceStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { pricePerGram: currentPrice?.pricePerGram ?? 0 },
  });

  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      updateGoldPrice(API_URL, { pricePerGram: data.pricePerGram }, ADMIN_KEY),
    onMutate: (data) => setOptimisticPrice(data.pricePerGram),
    onSuccess: () => {
      clearOptimisticPrice();
      queryClient.invalidateQueries({ queryKey: ["gold-price"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({ title: "Gold price updated", description: "All product prices have been recalculated." });
    },
    onError: (err) => {
      clearOptimisticPrice();
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
        <Label htmlFor="pricePerGram">Gold Rate (₹ per gram)</Label>
        <Input
          id="pricePerGram"
          type="number"
          step="0.01"
          placeholder="e.g. 9450"
          {...register("pricePerGram")}
        />
        {errors.pricePerGram && (
          <p className="text-xs text-red-500 mt-1">{errors.pricePerGram.message}</p>
        )}
      </div>
      <Button type="submit" disabled={mutation.isPending} className="self-start">
        {mutation.isPending && <Loader2 size={14} className="animate-spin" />}
        Update Gold Price
      </Button>
    </form>
  );
}
