
# Word River

[![Server Build Status](../../actions/workflows/server.yml/badge.svg)](../../actions/workflows/server.yml)
[![Client Build Status](../../actions/workflows/client.yaml/badge.svg)](../../actions/workflows/client.yaml)
[![End to End Build Status](../../actions/workflows/e2e.yaml/badge.svg)](../../actions/workflows/e2e.yaml)

[![BCH compliance](https://bettercodehub.com/edge/badge/UMM-CSci-3601-S21/it-3-geduk?branch=main)](https://bettercodehub.com/)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/UMM-CSci-3601-S21/it-3-geduk.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/UMM-CSci-3601-S21/it-3-geduk/alerts/)
- [Technical Document](#deployment)
- [Improvements and Issues](#todolist)
- [Resources](#resources)
- [Contributors](#contributors)
---

## Purpose

For teachers who wish to support beginners’ engagement with language,
Word River is a tool that supports the management and analysis of language exploration.
Unlike managing all of this information by hand, our product makes it easy to manage what words are available (through the creation, viewing, and assignment of personalized content) and understand more about a learner’s exploration and progress (by providing information about language exposure and the results of various activities).

## Project Features

### Create Context Packs In App
1.) From the main page, click on the '+add' button.
![](readme-images/create-button.png)
2.) Add a valid name.<br>
3.) Choose wether this context pack will be enabled in Story Builder.<br>
4.) (Optional) Add a link (URL) to an icon you would like for your context pack.<br>
5.) Once all required fields have valid information, you may click 'ADD CONTEXT PACK' button.<br>
![](readme-images/add-info.png)<br>
6.) Click on 'ADD WORDLIST' button OR optionally, import wordlist JSON file.<br> 
![](readme-images/add-wordlist.png)<br>
7.) Add wordlist name.<br>
8.) Select a wordlist type from the drop-down menu. <br>
9.) You may add words to the word lists along with their forms separated by commas. For example: "word, words"<br>
10.) Click 'ADD WORD' button.<br>
![](readme-images/wordlist-information.png)<br>
![](readme-images/add-words.png)<br>
11.) Add as many words as you would like to the wordlists, then click 'SAVE WORDLIST'<br>
![](readme-images/save-wordlist.png)<br>
12.) Click 'SAVE CONTEXT PACK'<br>
![](readme-images/save-context-pack.png)<br>
13.) Congratulations, you've created a context pack! You may now go back and add more wordlists to it, or edit them.<br>

---
### Import An Existing Context Pack
1.) Click on the 'IMPORT' button.<br>
![](readme-images/import-context-pack.png) <br>
2.) Select a valid context pack JSON file. <br>
![](readme-images/the-JSON.png) <br><br>
![](readme-images/select-json-file.png)<br>
3.) Click the import button. <br>
![](readme-images/click-import-button.png) <br>
4.) You will be brought back into the context pack editing screen.<br>
5.) Either edit your imported context pack, or click 'SAVE CONTEXT PACK'<br>
![](readme-images/save-context-pack.png)

### Change Context Pack Name
1.) Click on a context pack.
2.) You will see context pack details. <br>
![](readme-images/details.png) <br>
3.)Look for the context pack name.<br>
![](readme-images/name.png) <br>
4.)Change context pack name.<br>
![](readme-images/editname.png) <br>
5.) Click 'SAVE CONTEXT PACK'.<br>
![](readme-images/save-context-pack.png)<br>
6.)Context pack name is updated.<br>
![](readme-images/updated.png) <br>

### Change Context Pack Enable/Disable Value
1.) Click on a context pack. <br>
2.) You will see context pack details. <br>
![](readme-images/details.png) <br>
3.)Look for the context pack 'ENABLE/DISABLE' button.<br>
![](readme-images/enable.png) <br>
4.)Click the 'ENABLE' button. <br>
5.)Context pack name is updated.<br>
![](readme-images/updated.png) <br>
6.)The value of the 'ENABLE/DISABLE' button should change.<br>
![](readme-images/disable.png) <br>
### Export Context Pack
1.) Click on a context pack.<br>
2.) You will see context pack details. <br>
![](readme-images/details.png) <br>
3.) Click the 'EXPORT CONTEXT PACK' button.<br>
![](readme-images/export.png) <br>
4.) You should see the export context pack page.<br>
![](readme-images/exportpage.png) <br>
5.) You cancel the export by pressing the cancel button.<br>
![](readme-images/cancel.png) <br>
6.) Press the 'VIEW CONTEXT PACK JSON' button.<br>
![](readme-images/jsonbutton.png) <br>
7.) You should see the context pack json.<br>
![](readme-images/json.png) <br>
8.) Press the 'DOWNLOAD JSON' button.<br>
![](readme-images/downloadjson.png) <br>
9.) It should download the context pack JSON.<br>
![](readme-images/finishdownload.png) <br>

### Tool Tips
1.) Click on a context pack.<br>
2.) You will see context pack page.<br>
![](readme-images/contextpackpage.png) <br>
3.) Hover over any word in the wordlists.<br>
![](readme-images/screen.png) <br>
4.) You will see the word and its form.<br>


### Add Word
1.) Click on a context pack. <br>
2.) You will see context pack page.<br>
![](readme-images/contextpackpage.png) <br>
3.) Click a wordlist.<br>
![](readme-images/wordlist.png) <br>
4.) You will see the wordlist details.<br>
![](readme-images/wordlistdetail.png) <br>
5.) Look for 'Add a new word'.<br>
![](readme-images/lookforadd.png) <br>
6.) Find add word and forms.<br>
![](readme-images/addword.png) <br>
7.) Type in the word and its forms.<br>
![](readme-images/formtwo.png) <br>
8.) Click the 'Add' button.<br>
![](readme-images/add.png) <br>
8.)Word and Forms should add to the wordlist.<br>
![](readme-images/wordadded.png) <br>
<br>

## [Technical Document](DEPLOYMENT.md)

## [Improvements and Issues](todolist.md)

Page of issues and improvements that need to be made.
