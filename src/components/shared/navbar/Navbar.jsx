import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Diameter,
  DoorOpen,
  LogIn,
  LogOutIcon,
  LucideMenu,
  Settings2,
  User2Icon,
} from "lucide-react";
import { Link } from "react-router";
import UserNavMenu from "./menu/UserNavMenu";

const Navbar = () => {
  const user = false;
  return (
    <>
      <nav className="relative bg-white shadow-sm min-h-16 flex items-center">
        <div className=" flex justify-between items-center w-11/12 md:container mx-auto">
          {/* LOGO */}
          <div className="">
            <Link
              to={"/"}
              className="flex justify-between items-center  leading-none text-secondary-foreground relative"
            >
              <Diameter className="size-10 font-bold text-secondary p-0.5 bg-primary rounded-full" />{" "}
              <span className="text-3xl font-bold absolute left-12">
                Nihonify
              </span>
            </Link>
          </div>

          {/* lg Menu */}
          <div className="hidden lg:inline">
            <UserNavMenu />
          </div>

          {/* Profile, Login & Mobile Menu */}
          <div className="flex items-center gap-2 justify-center">
            {user ? (
              <div className="flex items-center justify-center">
                <DropdownMenu>
                  <DropdownMenuTrigger className="border-0 outline-none rounded-sm">
                    <Avatar>
                      <AvatarImage
                        className=""
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User2Icon />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings2 />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogOutIcon />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center gap-2 justify-center">
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none flex items-center justify-center border rounded-sm hover:border-primary">
                    <Avatar className="flex items-center justify-center">
                      <AvatarImage
                        src="./user-round.svg"
                        className="size-6 object-contain"
                        alt="@shadcn"
                      />
                      <AvatarFallback>
                        <User2Icon />
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogIn />
                      Login
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <DoorOpen />
                      Register
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* Mobile+Tablet Menu */}
                <div className="lg:hidden flex items-center justify-center">
                  <Sheet>
                    <SheetTrigger className="border size-10 flex items-center justify-center rounded-sm hover:border-primary">
                      <LucideMenu className="size-8 p-1" />
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle></SheetTitle>
                        <SheetDescription>
                          <UserNavMenu isMobile={true} />
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
