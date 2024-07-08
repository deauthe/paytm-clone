import { Button } from "./button";

interface AppbarProps {
	user?: {
		name?: string | null;
	};
	// TODO: can u figure out what the type should be here?
	onSignin: () => void;
	onSignout: () => void;
}

export const AppBar = ({ user, onSignin, onSignout }: AppbarProps) => {
	return (
		<div className="flex justify-between border-b px-4">
			<div className="text-lg flex flex-col justify-center font-extrabold">
				PayTM
			</div>
			<div className="flex flex-col justify-center pt-2">
				<Button
					onClick={user ? onSignout : onSignin}
					className="text-base font-bold "
				>
					{user ? "Logout" : "Login"}
				</Button>
			</div>
		</div>
	);
};