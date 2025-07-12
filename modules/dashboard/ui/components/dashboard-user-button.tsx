"use client"

import { useIsMobile } from '@/hooks/use-mobile'

import { GeneratedAvatar } from '@/components/generated-avatar'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'

import { signOut, useSession } from '@/lib/auth-client'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { ChevronDownIcon, CreditCardIcon, LogOut, LogOutIcon, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AvatarFallback } from '@/components/ui/avatar'

export const DashboardUserButton = () => {
    const { data, isPending } = useSession()
    const isMobile = useIsMobile()
    const router = useRouter()

    const onLogout = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/sign-in')
                }
            }
        })
    }

    if (isPending || !data?.user) {
        return null
    }

    if (isMobile) {
        return (
            <div className='flex flex-col gap-3 p-4'>
                {data && (
                    <>
                        <div className="flex items-center gap-4">
                            <Avatar className="w-12 h-12">
                                <Link href="/dashboard">
                                    {data.user?.image ? (
                                        <AvatarImage src={data.user.image} alt="User Avatar" className='rounded-full'/>
                                    ) : (
                                        <AvatarFallback><User /></AvatarFallback>
                                    )}
                                </Link>
                            </Avatar>

                            <div className='flex flex-col gap-1'>
                                <p className="font-medium">{data.user.name}</p>
                                <p className="text-sm text-muted-foreground">Welcome to Meet.AI</p>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            className="w-full rounded-full text-black"
                            onClick={() => signOut()}
                        >
                            <LogOut /> Logout
                        </Button>
                    </>
                )}
            </div>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='rounded-lg border border-border/10 p-3 gap-2 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden'>
                {data.user.image ? (
                    <Avatar>
                        <AvatarImage src={data.user.image} className='size-9 rounded-full' />
                    </Avatar>
                ) : (<GeneratedAvatar
                    seed={data.user.name}
                    variant='initials'
                    className='size-9 mr-3'
                />
                )}
                <div className='flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0'>
                    <p className='text-sm truncate w-full'>
                        {data.user.name}
                    </p>
                    <p className='text-xs truncate w-full'>
                        {data.user.email}
                    </p>
                </div>
                <ChevronDownIcon className='size-4 shrink-0' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' side='right' className='w-72'>
                <DropdownMenuLabel>
                    <div className='flex flex-col gap-1'>
                        <span className='font-medium truncate'>{data.user.name}</span>
                        <span className='text-sm font-normal text-muted-foreground truncate'>{data.user.email}</span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer flex items-center justify-between'>
                    Billing <CreditCardIcon className='size-4' />
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout} className='cursor-pointer flex items-center justify-between'>
                    Logout <LogOutIcon className='size-4' />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}