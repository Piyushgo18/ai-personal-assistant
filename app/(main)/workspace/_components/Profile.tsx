import React, { useContext, useEffect, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AuthContext } from '@/context/AuthContext'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Loader2Icon, WalletCardsIcon } from 'lucide-react'
import axios from 'axios'
import { col, desc } from 'motion/react-client'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'

function Profile({openDialog, onClose}: {openDialog: boolean, onClose: () => void}) {
    const {user} = useContext(AuthContext)
    const [loading,setLoading] = useState(false);
    const [maxToken, setMaxToken] = useState<number>(0);
    const updateUserOrder=useMutation(api.users.UpdateTokens)
    useEffect(()=>{
        if(user?.orderId){
            setMaxToken(500000);
        } 
        else {
            setMaxToken(5000);
        }
    },[user]);

    useEffect(()=>{
        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    },[]);

    const GenerateSubscriptionId=async()=>{
        setLoading(true);
        const result=await axios.post('/api/create-subscription');
        MakePayment(result?.data?.id);
        setLoading(false);
    }

    const MakePayment=(subscriptionId: string)=>{
        let options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_LIVE_KEY!,
            subscription_id: subscriptionId,
            name: 'Ai Genius',
            description: 'Pro Plan',
            image: '/logo.svg',
            handler:async function(resp:any){
                if(resp?.razorpay_payment_id){
                    await updateUserOrder({
                        uid: user?._id,
                        orderId: resp.razorpay_subscription_id,
                        credits: user.credits + 500000
                    });
                    toast('Payment successful!, your tokens have been updated.');
                }
            },
            "prefill": {
                name: user?.name,
                email: user?.email
            },
            notes:{

            },
            theme:{
                color: '#000000'
            }
        };

        //@ts-ignore
        const rzp = new window.Razorpay(options);
        rzp.open();
    }

    const cancelSubscription=async()=>{
        setLoading(true);
        try {
            const result = await axios.post('/api/cancel-subscription', {
                subId: user?.orderId
            });
            toast('Subscription cancelled successfully');
            
            // Update user order status to remove the subscription
            await updateUserOrder({
                uid: user?._id,
                orderId: '',
                credits: user.credits
            });
            
            window.location.reload();
        } catch (error) {
            console.error('Error cancelling subscription:', error);
            toast('Failed to cancel subscription. Please try again.');
        } finally {
            setLoading(false);
        }
    }

  return (
      <Dialog open={openDialog} onOpenChange={onClose}>
          {/* <DialogTrigger>Open</DialogTrigger>  */}
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>{}</DialogTitle>
                  <DialogDescription>
                      <div>
                        <div className='flex items-center gap-4'> 
                            <Image src={user?.picture} alt='user' width={150} height={150} className='w-[60px] h-[60px] rounded-full'/>
                            <div className=''>
                                <h2 className='font-bold text-lg'>{user?.name}</h2>
                                <h2 className='text-gray-500'>{user?.email}</h2>
                            </div>
                        </div>
                        <hr className='my-3'></hr>
                        <div className='flex flex-col gap-2'>
                            <h2 className='font-bold'>Token Usage</h2>
                            <h2>{user?.credits}/{maxToken}</h2>
                            <Progress value={(user?.credits/(!user?.orderId ?maxToken : maxToken+500000))*100}/>
                            <h2 className='flex justify-between font-bold mt-3 text-lg'>Current Plan <span className='p-1 bg-gray-100 rounded-md px-2 font-normal'>{!user?.orderId?'Free Plan':'Pro Plan'}</span></h2>
                        </div>
                        {!user?.orderId ? (
                            <>
                                <div className='p-4 border rounded-xl mt-4'>
                                    <div className='flex justify-between'>
                                        <div>
                                            <h2 className='font-bold text-lg'>Pro Plan</h2>
                                            <h2>500,000 Tokens</h2>
                                        </div>
                                        <h2 className='font-bold text-lg'>$10/month</h2>
                                    </div>
                                    <hr className='my-3'/>
                                    {!loading ? (
                                        <DialogClose className='w-full'>
                                            <Button className='w-full' disabled={loading} onClick={GenerateSubscriptionId}>{loading?<Loader2Icon className='animate-spin'/>:<WalletCardsIcon/>} Upgrade ${10}</Button>
                                        </DialogClose>
                                    ) : (
                                        <Button className='w-full' disabled={loading} onClick={GenerateSubscriptionId}>{loading?<Loader2Icon className='animate-spin'/>:<WalletCardsIcon/>} Upgrade ${10}</Button>
                                    )}
                                </div>
                                <div className='mt-5 flex justify-end'>
                                    <DialogClose>
                                        <Button variant={'secondary'}>Cancel</Button>
                                    </DialogClose>
                                </div>
                            </>
                        ) : (
                            <div className='mt-4'>
                                <Button 
                                    className='w-full' 
                                    variant='destructive' 
                                    onClick={cancelSubscription}
                                    disabled={loading}
                                >
                                    {loading ? <Loader2Icon className='animate-spin'/> : 'Cancel Subscription'}
                                </Button>
                                <div className='mt-3 flex justify-end'>
                                    <DialogClose>
                                        <Button variant={'secondary'}>Close</Button>
                                    </DialogClose>
                                </div>
                            </div>
                        )}
                      </div>
                  </DialogDescription>
              </DialogHeader>
          </DialogContent>
      </Dialog>
  )
}

export default Profile
