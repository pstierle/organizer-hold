import { Store } from "./interfaces/Store";
import PopUps from "./interfaces/PopUps";

const fs = (window as any).fs;
const appPath = (window as any).app.getPath();
const path = (window as any).path;

const folderPath = path.join(appPath, "userdata");
const userDataPath = path.join(appPath, "userdata", "user.json");

export default interface UserStore extends Object {
	username: String;
	darkMode: boolean;
	openPopUp: PopUps | undefined;
	selectedSheetNumber: number;
	studentID: string | undefined;
}

class UserState extends Store<UserStore> {
	protected data(): UserStore {
		return {
			username: "",
			openPopUp: null,
			darkMode: false,
			selectedSheetNumber: 0,
			studentID: undefined
		};
	}

	saveUser(): void {
		fs.writeFileSync(userDataPath, JSON.stringify(this.state, null, 4));
	}

	setSelectedSheetNumber(number: number): void {
		this.state.selectedSheetNumber = number;
	}

	getSelectedSheetNumber(): number {
		return this.state.selectedSheetNumber;
	}

	setStudentID(id: string | undefined): void {
		this.state.studentID = id;
		this.saveUser();
	}

	// onstart create user.json
	preload(): void {
		const userSaved: boolean = fs.existsSync(userDataPath);
		const folderExist: boolean = fs.existsSync(folderPath);

		if (!folderExist) {
			fs.mkdirSync(folderPath);
		}
		if (!userSaved) {
			fs.writeFileSync(userDataPath, JSON.stringify(this.state, null, 4));
		}
	}

	async loadUser() {
		const userdata = await fs.readFileSync(userDataPath);
		const parsedData: UserStore = JSON.parse(userdata);
		this.state.darkMode = parsedData.darkMode;
		this.state.username = parsedData.username;
		this.state.studentID = parsedData.studentID;
		this.checkDarkMode();
	}

	setDarkMode(toogle: boolean): void {
		this.state.darkMode = toogle;
		this.checkDarkMode();
		this.saveUser();
	}

	darkMode(): boolean {
		return this.state.darkMode;
	}

	checkDarkMode(): void {
		let appMode = document.querySelector("html")?.classList;

		if (this.state.darkMode) appMode?.add("dark");
		else appMode?.remove("dark");
	}

	setOpenPopUp(popUp: PopUps): void {
		this.state.openPopUp = popUp;
	}

	getOpenPopUp(): PopUps | undefined {
		return this.state.openPopUp;
	}

	closePopUp(): void {
		this.state.openPopUp = undefined;
	}
}

export const userStore: UserState = new UserState();
