
import { getRecommended } from "@/lib/recommended-service"
import { Recommended, RecommendedSkeleton } from "./recommended"
import { Toggle, ToggleSkeleton } from "./toggle"
import { Wrapper } from "./wrapper"
import { getFollowedUsers } from "@/lib/follow-service"
import { Following } from "./following"

export const Sidebar = async () => {

    const recommended = await getRecommended()
    const follows = await getFollowedUsers()

    return (
        <Wrapper>
          <Toggle/>
          <div className="space-y-4 pt-4 lg:pt-0">
            <Recommended
            //@ts-ignore
              data={recommended}
            />
            <Following
              data={follows}
            />
          </div>
        </Wrapper>
    )
}

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full border-r bg-background border-[#2D2E35] z-50">
      <ToggleSkeleton/>
      <RecommendedSkeleton/>
    </aside>
  )
}