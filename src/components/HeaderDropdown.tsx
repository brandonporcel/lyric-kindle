import { CreditCard, LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

function HeaderDropdown(props: any) {
  const {
    children,
    logged,
  }: {
    children: React.ReactNode;
    logged: boolean;
  } = props;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        {logged && (
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <a
                href="https://github.com/brandonporcel"
                target="_blank"
                rel="noopener"
              >
                <DropdownMenuItem>
                  <span>GitHub</span>
                </DropdownMenuItem>
              </a>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <a href="/api/auth/signout">
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </a>
          </DropdownMenuContent>
        )}
        {!logged && (
          <DropdownMenuContent className="w-56">
            <a
              href="https://github.com/brandonporcel"
              target="_blank"
              rel="noopener"
            >
              <DropdownMenuItem>
                <span>GitHub</span>
              </DropdownMenuItem>
            </a>
            <DropdownMenuSeparator />

            <a href="/signin">
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign In</span>
                <DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
              </DropdownMenuItem>
            </a>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </>
  );
}

export default HeaderDropdown;
