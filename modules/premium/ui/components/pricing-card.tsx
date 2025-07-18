import { CircleCheckIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const pricingCardVariants = cva("rounded-2xl px-6 py-10 w-[90%] mx-auto max-w-md overflow-x-hidden transition-all hover:scale-103 duration-300", {
    variants: {
        variant: {
            default: "bg-background text-foreground shadow-lg border",
            highlighted: "bg-linear-to-br from-[#093C23] to-[#051B16] text-white",
        }
    },
    defaultVariants: {
        variant: "default"
    }
})

const pricingCardIconVariants = cva("size-5", {
    variants: {
        variant: {
            default: "fill-primary text-white dark:text-green-600",
            highlighted: "fill-white text-primary dark:text-green-600",
        }
    },
    defaultVariants: {
        variant: "default"
    }
})

const pricingCardSecondaryTextVariables = cva("text-neutral-700", {
    variants: {
        variant: {
            default: "text-muted-foreground",
            highlighted: "text-muted-foreground"
        }
    }
})

const pricingCardBadgeVariants = cva("text-black text-xs font-normal p-1", {
    variants: {
        variant: {
            default: "bg-primary/20",
            highlighted: "bg-[#F5B797]"
        }
    },
    defaultVariants: {
        variant: "default"
    }
})

interface Props extends VariantProps<typeof pricingCardVariants> {
    badge?: string | null
    price: number
    features: string[]
    title: string
    description?: string | null
    priceSuffix: string
    className?: string
    buttonText: string
    onClick: () => void
}

export const PricingCard = ({
    variant,
    badge,
    price,
    features,
    title,
    description,
    priceSuffix,
    className,
    buttonText,
    onClick
}: Props) => {

    return (
        <div className={cn(pricingCardVariants({ variant }), className)}>
            <div className="flex flex-col gap-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                            <h6 className="font-semibold text-xl">{title}</h6>
                            {badge ? (
                                <Badge className={cn(pricingCardBadgeVariants({ variant }))}>
                                    {badge}
                                </Badge>
                            ) : null}
                        </div>
                        {description && (
                            <p className={cn("text-sm", pricingCardSecondaryTextVariables({ variant }))}>
                                {description}
                            </p>
                        )}
                    </div>
                    <div className="flex items-end gap-1 shrink-0">
                        <h4 className="text-2xl font-bold">
                            {Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                                minimumFractionDigits: 0,
                            }).format(price)}
                        </h4>
                        <span className={cn("text-sm", pricingCardSecondaryTextVariables({ variant }))}>
                            {priceSuffix}
                        </span>
                    </div>
                </div>

                <Separator className="text-muted-foreground" />

                <Button
                    className="w-full text-sm font-medium shadow-lg shadow-primary/40"
                    size="lg"
                    variant={variant === "highlighted" ? "default" : "outline"}
                    onClick={onClick}
                >
                    {buttonText}
                </Button>

                <div className="flex flex-col gap-3 mt-4">
                    <p className="font-semibold uppercase text-sm tracking-wide">Features</p>
                    <ul className={cn("flex flex-col gap-2 text-sm", pricingCardSecondaryTextVariables({ variant }))}>
                        {features?.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2.5">
                                <CircleCheckIcon className={cn(pricingCardIconVariants({ variant }))} />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    )
}