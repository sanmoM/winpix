import Container from "@/components/shared/container";
import UserLayout from "@/layouts/user-layout";
import { RiShoppingBag3Fill } from "react-icons/ri";

export default function redeem() {
  return (
    <UserLayout>
      <Container>
        <div className="grid grid-cols-8">
          <div className="border p-4 bg-bg-primary dark:bg-[#0B1120] rounded-lg">
            <img src="https://cdn.pulsepx.com/redemption-assets/1000003/icon?v=1" alt="redeem" className="w-[90%] mx-auto mb-3" />
            <h1 className="text-center text-sm text-gray-400 mb-2">X200</h1>

            <button className={"px-4 py-2 text-sm font-semibold !text-white rounded-full transition cursor-pointer duration-150 ease-in-out bg-gradient-to-r bg-[linear-gradient(45deg,var(--color-primary-color),var(--color-secondary-color))] flex items-center gap-2 mx-auto"}>
              <p>200</p><img src="/images/golden-coin.png" alt="" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Container>
    </UserLayout >
  )
}
