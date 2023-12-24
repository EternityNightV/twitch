"use client"

import { useAuth } from "@clerk/nextjs"
import { Button } from "../ui/button"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { onFollow, onUnfollow } from "@/actions/follow"
import { toast } from "sonner"
import { Skeleton } from "../ui/skeleton"

interface ActionsProps {
    hostIdentity : string,
    isFollowing : boolean,
    isHost  : boolean
}


export const Actions = ({
    hostIdentity,
    isFollowing,
    isHost
} : ActionsProps) => {

    const [ isPending, startTransition]  = useTransition()
    const router = useRouter()

    const { userId } = useAuth()

    const toggleFollow = () => {
        if(!userId) {
        return router.push("/sign-in")
        }

        if(isHost) return

        if(isFollowing) {
            hadnleUnFollow()
        } else {
            hadnleFollow()
        }
    }

    const hadnleFollow = () => {
        startTransition(() => {
            onFollow(hostIdentity)
            .then((data) => toast.success(`You are now following ${data?.following.username}`))
            .catch(() => toast.error("Something went wrong"))
        })
    }

    const hadnleUnFollow = () => {
        startTransition(() => {
            onUnfollow(hostIdentity)
            .then((data) => toast.success(`You are now unfollowed ${data?.following.username}`))
            .catch(() => toast.error("Something went wrong"))
        })
    }

    return (
        <Button
          onClick={toggleFollow}
          variant="primary"
          size="sm"
          className="w-full lg:w-auto"
          disabled={isPending || isHost}
        >
          <Heart className={cn(
            "w-4 h-4 mr-2",
            isFollowing 
            ? "fill-white"
            : "fill-none"
          )}/>
          {isFollowing
            ? "Unfollow"
            : "Follow"
          }
        </Button>
    )
}

export const ActionsSkeleton = () => {
    return (
        <Skeleton className="h-10 w-full lg:w-24"/>
    )
}