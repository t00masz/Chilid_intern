import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import JSONdata from '../data/dane.json'

let direction = 1;
const recordOnPage = 5;
let pages = [];
let actualPage = 1;
let counter = 0;
const data = translateDate(JSONdata);

function translateDate(importedData) {
    let i;
    const months = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];       
    let tempDate; 
    for(i = 0; i < Object.keys(JSONdata).length; i++){
        let splittedDate = (importedData[i].dateOfBirth.replace(' ', '.')).split(".")
        let compiledDate = new Date(splittedDate[2], splittedDate[1]-1, splittedDate[0])
        importedData[i].dateOfBirth = Date.parse(compiledDate);
        tempDate = new Date(importedData[i].dateOfBirth)
        importedData[i].dateOfBirthTranslated = tempDate.getUTCDate() + ' ' + months[tempDate.getUTCMonth()] + ' ' + tempDate.getUTCFullYear();
        
    }
    return (importedData)
}

function getPages(){
    let i;
    for (i = 0;; i++) { 
        if ((Object.keys(data).length)/(recordOnPage * i) <= 1) {break;}
        pages[i] = i + 1;
    }
    return (i);
}

class ReactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: data,
            actualPage: 1,
            pages: getPages(),
        }

    this.sortBy = this.sortBy.bind(this);
    this.compareBy = this.compareBy.bind(this);
    this.showData = this.showData.bind(this);
    this.createPagination = this.createPagination.bind(this);
    this.createTable = this.createTable.bind(this);

    }

    componentDidMount() {
        this.showData(actualPage);
    }

    createTable(actualNumber) { 
        counter++;
        if ((counter % 2 == 0)) {
            return (
                console.log(counter),
                <tr className='row2'>
                   <td className='tableContent1'>{actualNumber.id}</td>
                   <td className='tableContent2'>{actualNumber.firstName}</td>
                   <td className='tableContent1'>{actualNumber.lastName}</td>
                   <td className='tableContent2'>{actualNumber.dateOfBirthTranslated}</td>
                   <td className='tableContent1'>{actualNumber.company}</td>                  
                   <td className='tableContent2'>{actualNumber.note}</td>
                </tr>
            )
        }
        else {
            return (
                console.log(counter),
                <tr className='row1'>
                   <td className='tableContent1'>{actualNumber.id}</td>
                   <td className='tableContent2'>{actualNumber.firstName}</td>
                   <td className='tableContent1'>{actualNumber.lastName}</td>
                   <td className='tableContent2'>{actualNumber.dateOfBirthTranslated}</td>
                   <td className='tableContent1'>{actualNumber.company}</td>                  
                   <td className='tableContent2'>{actualNumber.note}</td>
                </tr>
            )
        }
    }

    createPagination(actualNumber) { 
        if (actualNumber == actualPage) {
            return(
                <a href class="active" onClick={() => this.showData(actualNumber)}>{actualNumber}</a> 
            )
        }
        else {
            return(
                <a href onClick={() => this.showData(actualNumber)}>{actualNumber}</a> 
            )
        }
    }

    compareBy(key) {
        console.log('licznik')
        return function (a, b) {
            if (a[key] < b[key]) return (-1 * direction);
            if (a[key] > b[key]) return (1 * direction);
        return 0;
        };
    }
     
    sortBy(key) {
        let arrayCopy = data;
        arrayCopy.sort(this.compareBy(key));
        direction = direction * (-1);
        this.setState({
            data: arrayCopy,
        });
        this.showData(actualPage);
    }
  
    showData(part) {
        counter = 0;
        if (part < 1){part = 1}
        if (part > this.state.pages){part = this.state.pages}
        actualPage = part;
        let slicedArray = [];
        const arrayLength = Object.keys(data).length;
        for (let i=(recordOnPage*(part-1)); i<(recordOnPage*(part)); i++){
            if (arrayLength == i) { break; }
            slicedArray[i] = data[i];
            slicedArray[i].dateOfBirth = slicedArray[i].dateOfBirth
        }
        slicedArray = slicedArray.filter(e => e);
        this.setState({
            data: slicedArray
        });
    }

    render() {
        return(
            <div className='conteiner0'>
            <div className='conteiner1'>
            <img className='logo' src="./icons/icon - pracownicy.svg"></img>
            <h1 className='header'>Lista Pracowników</h1>
            <table className='table'>
            <thead>
                <tr>
                <th className='tableContent3' width="56px" onClick={() => this.sortBy('id')}> iD  
                <img className='arrows'  src="./icons/arrows.jpg"></img>
                </th>
                <th className='tableContent3' width="139px" onClick={() => this.sortBy('firstName')}>First Name   
                <img className='arrows'  src="./icons/arrows.jpg"></img>
                </th>
                <th className='tableContent3' width="137px" onClick={() => this.sortBy('lastName')}>Last Name   
                <img className='arrows'  src="./icons/arrows.jpg"></img>
                </th>
                <th className='tableContent3' width="183px" onClick={() => this.sortBy('dateOfBirth')}>Birth date  
                <img className='arrows'  src="./icons/arrows.jpg"></img>
                </th>
                <th className='tableContent3' width="131px" onClick={() => this.sortBy('company')}>Company   
                <img className='arrows'  src="./icons/arrows.jpg"></img>
                </th>
                <th className='tableContent3' width="133px" onClick={() => this.sortBy('note')}>Note  
                <img className='arrows'  src="./icons/arrows.jpg"></img>
                </th>
                </tr>
            </thead>
            <tbody>
            {
            this.state.data.map(this.createTable)
            }
            </tbody>
            </table>
            </div>
            <div className='conteiner2'>
            <div className='pagination'>
            <a href onClick={() => this.showData(actualPage-1)}><font color="FFFFFF">&lt;&nbsp;back</font></a>
            {pages.map(this.createPagination)}
            <a href onClick={() => this.showData(actualPage+1)}><font color="FFFFFF">next&nbsp;&gt;</font></a>
            </div>
            </div>
            <img className='footer' src="./icons/chilid-logo.svg"></img>
            </div>
        )
    }
}

ReactDOM.render(
    <ReactForm />, document.getElementById("app")
);
