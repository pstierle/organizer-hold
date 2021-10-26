import {Store} from "./interfaces/Store";
import PopUps from "./interfaces/PopUps";

const fs = (window as any).fs;
const appPath = (window as any).app.getPath();
const path = (window as any).path;

const folderPath = path.join(appPath, 'userdata');
const userDataPath = path.join(appPath, 'userdata', 'user.json');

export default interface UserStore extends Object {
    username: String,
    darkMode: Boolean,
    openPopUp: PopUps | undefined,
    selectedSheetNumber: Number,
}

class UserState extends Store<UserStore> {
    protected data(): UserStore {
        return {
            username: "",
            openPopUp: null,
            darkMode: false,
            selectedSheetNumber: 0,
        };
    }


    saveUser() : void {
        fs.writeFileSync(userDataPath, JSON.stringify(this.state, null, 4));
    }

    setSelectedSheetNumber(number : Number) : void{
        this.state.selectedSheetNumber = number;
    }

    getSelectedSheetNumber() : Number{
        return this.state.selectedSheetNumber;
    }

    // onstart create user.json
    preload() : void{
        const userSaved : Boolean = fs.existsSync(userDataPath);
        const folderExist : Boolean = fs.existsSync(folderPath);

        if(!folderExist){
            fs.mkdirSync(folderPath);
        }
        if(!userSaved){
            fs.writeFileSync(userDataPath, JSON.stringify(this.state, null, 4));
        }
    }

    async loadUser() {
        const userdata = await fs.readFileSync(userDataPath);
        const parsedData : UserStore = JSON.parse(userdata);
        this.state.darkMode = parsedData.darkMode;
        this.state.username = parsedData.username;
        this.checkDarkMode();      
    }

    setDarkMode(toogle : Boolean) : void{
        this.state.darkMode = toogle;
        this.checkDarkMode();
        this.saveUser();
    }

    darkMode(): Boolean{
        return this.state.darkMode;
    }

    checkDarkMode() : void{
        let appMode = document.querySelector("html")?.classList;
        
        if (this.state.darkMode) appMode?.add("dark");
        else appMode?.remove("dark");
    }

    setOpenPopUp(popUp : PopUps) : void{
        this.state.openPopUp = popUp;
    }

    getOpenPopUp() : PopUps | undefined{
        return this.state.openPopUp;
    }

    closePopUp() : void{
        this.state.openPopUp = undefined;
    }
}

export const userStore: UserState = new UserState()