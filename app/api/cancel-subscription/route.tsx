import { NextRequest } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest){
    try {
        const {subId} = await req.json();
        
        if (!subId) {
            return Response.json({ error: 'Subscription ID is required' }, { status: 400 });
        }
        
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_LIVE_KEY,
            key_secret: process.env.RAZORPAY_SECRET_KEY
        });
        
        const result = await instance.subscriptions.cancel(subId);
        
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error('Error canceling subscription:', error);
        return Response.json({ error: 'Failed to cancel subscription' }, { status: 500 });
    }
}