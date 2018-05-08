# elta
[![GitHub issues](https://img.shields.io/github/issues/Voltos-zz/elta.svg)](https://github.com/Voltos-zz/elta/issues)
[![GitHub forks](https://img.shields.io/github/forks/Voltos-zz/elta.svg)](https://github.com/Voltos-zz/elta/network)
[![GitHub license](https://img.shields.io/github/license/Voltos-zz/elta.svg)](https://github.com/Voltos-zz/elta)

<a name="SystemRequirements"></a>
### System requirements
jquery-2.1.1 and Current

<a name="BasicInformation"></a>
### Basic information
"elta" is the reduction of the elastic table.  
The script copies the table into adaptive blocks and hides the original table.

<a name="HowToUse"></a>
### How to use
- Include the elta.js script on your page.  
- Add the elta class to the tables.  
- To apply default styles, add the elta-def class to tables.  
If the table elements have their own style classes, the script will copy them

<a name="СodeSample"></a>
### Сode sample
```html
<table class="elta elta-def table-class">
    <tr>
        <th>name</th>
        <th>lastname</th>
        <th>email</th>
        <th>sex</th>
        <th>age</th>
    </tr>
    <tr>
        <td>TestName</td>
        <td>TestLastname</td>
        <td class='email'>TestEmail@*****.com</td>
        <td class='sex'>Woman</td>
        <td>32</td>
    </tr>
</table>
```
This variant of the table will be converted to the code below
```html
<div class="elta-table elta-def table-class">
    <div class="elta-table-row">
        <div class="elta-table-row-col title">name</div>
        <div class="elta-table-row-col title">lastname</div>
        <div class="elta-table-row-col title">email</div>
        <div class="elta-table-row-col title">sex</div>
        <div class="elta-table-row-col title">age</div>
    </div>
    <div class="elta-table-row tbody">
        <div class="elta-table-row-col">TestName</div>
        <div class="elta-table-row-col">TestLastname</div>
        <div class="elta-table-row-col email">TestEmail@*****.com</div>
        <div class="elta-table-row-col sex">Woman</div>
        <div class="elta-table-row-col">32</div>
    </div>
</div>
```
