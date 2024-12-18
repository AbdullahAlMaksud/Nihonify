import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { useAuth } from "@/contexts/AuthContext";
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
  const { user, logout } = useAuth();
  console.log(user);
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
                        src={user?.photo}
                        alt={user?.username}
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to={"dashboard"} className="flex items-center gap-2">
                      <DropdownMenuItem>
                        <User2Icon className="size-4" />
                        Profile
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                      <Settings2 />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Button onClick={() => logout()}>
                        <LogOutIcon />
                        Logout
                      </Button>
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
                        src={"./user-round.svg"}
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
                    <Link to={"/login"}>
                      <DropdownMenuItem>
                        <LogIn />
                        Login
                      </DropdownMenuItem>
                    </Link>
                    <Link to={"/register"}>
                      <DropdownMenuItem>
                        <DoorOpen />
                        Register
                      </DropdownMenuItem>
                    </Link>
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
