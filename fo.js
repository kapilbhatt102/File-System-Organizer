const fs = require("fs");
const path = require("path");
let inputArr = process.argv.slice(2);

let command = inputArr[0];

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
      "docx",
      "doc",
      "pdf",
      "xlsx",
      "xls",
      "odt",
      "ods",
      "odp",
      "odg",
      "odf",
      "txt",
      "ps",
      "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb"],
  };
  

switch(command)
{
    case 'tree' :
        console.log("tree implemented");
        break;

    case 'organize' :
        organizefn(inputArr[1]);
        break;

    case 'help' :
        helpfn();
        break;

    default :
        console.log('Not a valid command');
}

function helpfn()
{
    console.log(`List of all the commands-
                    1) Tree Command - node fo.js tree <dirname>
                    2) Organize Command - node fo.js organize <dirname>
                    3) Help command - node fo.js helo`);
}

function organizefn(dirpath) {
        //input a directory path
    let destPath;

    if(dirpath==undefined)
    {
        console.log("Please enter a valid directory path");
        //check whether dirpath is passed or not
        return;
    }
    else
    {
        let doesExist = fs.existsSync(dirpath);
        //this willl tell whether the dirpath exists or not
        if (doesExist == true)
        {
            destPath = path.join(dirpath,"organized_files");

            if(fs.existsSync(destPath)==false)
            {
                fs.mkdirSync(destPath);
            }
            else{
                console.log("This folder already exists");
            }
        }
        else
        {
            console.log("Please enter a valid path");
        }
    }
    organizeHelper(dirpath, destPath)
}

function organizeHelper(src, dest)
{
    let childNames = fs.readdirSync(src);
    console.log(childNames);
    console.log(src);
    for(let i=0; i<childNames.length; i++)
    {
        let childAdress=path.join(src, childNames[i])
        let isFile = fs.lstatSync(childAdress).isFile()
        //console.log(childAdress + " "+isFile)

        if(isFile==true)
        {
            let fileCategory = getCategory(childNames[i])
            console.log(fileCategory);
        }
    }    
}


function getCategory(name)
{
    let ext = path.extname(name)
    ext = ext.slice(1);
    console.log(ext);

        for(let type in types)
        {
            let cTypeArr = types[type];

            for(let i=0;i<cTypeArr.length;i++)
            {
                if(ext==cTypeArr[i])
                return type;
            }
        }
    return "others"
}
