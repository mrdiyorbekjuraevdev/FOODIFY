import { useQueryClient } from "@foodify/api/query";
import { useAuthUser, useSignOut } from "@foodify/auth";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@foodify/design-system/components/dropdown";
import { useUserMeCache } from "@/servers/base/user";
import { User } from "@foodify/design-system/components/user";

export const UserDropdown = () => {
	const { user: { data: data } } = useUserMeCache();
	const signOut = useSignOut();
	const queryClient = useQueryClient();

	const handleSignOut = () => {
		signOut();
		queryClient.clear();
		window.location.assign(`${window.location.origin}/sign-in`);
	};

	return (
		<Dropdown>
			<DropdownTrigger>
				<User
					as="button"
					avatarProps={{
						isBordered: true,
						src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
					}}
					className="transition-transform"
					description={data?.user?.phone ?? "+998 -(90)-123-45-67"}
					name={data?.user?.fullname}
				/>
			</DropdownTrigger>
			<DropdownMenu
				aria-label="User menu actions"
				onAction={() => console.log()}
			>
				<DropdownItem
					key="profile"
					className="flex flex-col justify-start w-full items-start"
				>
					<p>Signed in as</p>
					<p>zoey@example.com</p>
				</DropdownItem>
				<DropdownItem key="settings">My Settings</DropdownItem>
				<DropdownItem key="team_settings">Team Settings</DropdownItem>
				<DropdownItem key="analytics">Analytics</DropdownItem>
				<DropdownItem key="system">System</DropdownItem>
				<DropdownItem key="configurations">Configurations</DropdownItem>
				<DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
				<DropdownItem
					key="logout"
					color="danger"
					className="text-danger"
					onClick={handleSignOut}
				>
					Log Out
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};
