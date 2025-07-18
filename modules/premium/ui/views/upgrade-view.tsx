"use client"

import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { authClient } from "@/lib/auth-client"

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { PricingCard } from "../components/pricing-card"

type Product = {
    id: string
    name: string
    description: string
    metadata: {
        badge?: string
        variant?: string
    }
    prices: {
        amountType: "fixed" | "variable"
        priceAmount: number
        recurringInterval: string
    }[]
    benefits: {
        description: string
    }[]
}


export const UpgradeView = () => {
    const trpc = useTRPC()
    const { data: products } = useSuspenseQuery(
        trpc.premium.getProducts.queryOptions()
    ) as { data: Product[] }

    const { data: currentSubscription } = useSuspenseQuery(
        trpc.premium.getCurrentSubscription.queryOptions()
    )

    return (
        <div className="flex-1 flex flex-col gap-y-10 py-4 px-4 md:px-8">
            <div className="flex-1 flex flex-col items-center mt-4 gap-y-10">
                <h5 className="font-medium text-2xl md:text-3xl">
                    You are on the {' '}
                    <span className="font-bold text-green-600">
                        {currentSubscription?.name ?? "Free"}
                    </span>{' '}
                    plan
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {products.map((product) => {
                        const isCurrentProduct = currentSubscription?.id === product.id
                        const isPremium = !!currentSubscription

                        let buttonText = "Upgrade"
                        let onClick = () => authClient.checkout({ products: [product.id] })

                        if (isCurrentProduct) {
                            buttonText = "Manage"
                            onClick = () => authClient.customer.portal()
                        } else if (isPremium) {
                            buttonText = "Change Plan"
                            onClick = () => authClient.customer.portal()
                        }

                        return (
                            <PricingCard
                                key={product.id}
                                buttonText={buttonText}
                                onClick={onClick}
                                variant={
                                    product.metadata.variant === "highlighted" ? "highlighted" : "default"
                                }
                                title={product.name}
                                price={
                                    product.prices[0].amountType === "fixed" ? product.prices[0].priceAmount / 100 : 0
                                }
                                description={product.description}
                                priceSuffix={`/${product.prices[0].recurringInterval}`}
                                features={product.benefits.map((benefit: { description: string }) => benefit.description)}
                                badge={product.metadata.badge as string | null}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export const UpgradeViewLoading = () => {
    return (
        <LoadingState
            title="Loading"
            description="This may take a few seconds"
        />
    )
}

export const UpgradeViewError = () => {
    return (
        <ErrorState
            title="Error"
            description="Please try again later"
        />
    )
}