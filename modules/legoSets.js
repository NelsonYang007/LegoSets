const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];


// Initialize the sets array
function Initialize() {

    return new Promise((resolve, reject) => {
        try{
            setData.forEach(set => {

                //Get the theme name using find() from themeData
                let theme = themeData.find(theme => theme.id == set.theme_id);
                
                sets.push({
                    set_num: set.set_num,
                    name: set.name, 
                    year: set.year,
                    theme_id: set.theme_id, 
                    num_parts: set.num_parts,
                    img_url: set.img_url,
                    theme_name: theme.name
                });
            });
            resolve("Data Initialized");
        }
        catch(err) {
            reject("Error Initializing");
        }
    });
    
    
}

Initialize();

//Get all sets
function getAllSets() {
    return new Promise((resolve, reject) => {
        try {
            resolve(sets);
        } catch (error) {
            reject("Error retrieving all sets");
        }
    });
    
}

//Get set by number
function getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
        try {
            const set = sets.find(set => set.set_num === setNum);
            if (set) {
                resolve(set);
            } else {
                reject(`Unable to find requested set with set_num: ${setNum}`);
            }
        } catch (error) {
            reject("Error retrieving set by number");
        }
    });
}

//Get sets by theme
function getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
        try {
            const lowerCaseTheme = theme.toLowerCase();
            const foundSets = sets.filter(set => set.theme_name.toLowerCase().includes(lowerCaseTheme));

            if (foundSets.length > 0) {
                resolve(foundSets);
            } else {
                reject(`Unable to find requested sets with theme: ${theme}`);
            }
        } catch (error) {
            reject("Error retrieving sets by theme");
        }
    });
}

//Export the functions
module.exports = {sets, Initialize, getAllSets, getSetByNum, getSetsByTheme}