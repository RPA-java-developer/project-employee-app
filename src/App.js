import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import React from 'react';
import { PersonaService } from './service/PersonaService';
import {DataTable} from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Panel} from 'primereact/panel';
import {Menubar} from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Image } from 'primereact/image';


import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

/*
const personas = []
const cars = [
	{ brand: 'VW', year: 2012, color: 'Orange', vin: 'dsad231ff' },
	{ brand: 'Audi', year: 2011, color: 'Black', vin: 'gwregre345' },
	{ brand: 'Renault', year: 2005, color: 'Gray', vin: 'h354htr' },
	{ brand: 'BMW', year: 2003, color: 'Blue', vin: 'j6w54qgh' },
	{ brand: 'Mercedes', year: 1995, color: 'Orange', vin: 'hrtwy34' },
	{ brand: 'Volvo', year: 2005, color: 'Black', vin: 'jejtyj' },
	{ brand: 'Honda', year: 2012, color: 'Yellow', vin: 'g43gr' },
	{ brand: 'Jaguar', year: 2013, color: 'Orange', vin: 'greg34' },
	{ brand: 'Ford', year: 2000, color: 'Black', vin: 'h54hw5' },
	{ brand: 'Fiat', year: 2013, color: 'Red', vin: '245t2s' }
];
*/

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

function validate(email) {
  return {
    email: email.length === 0
  };
}


export default class App extends Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);


    
    /*
    this.setState({
      personas: []
    });
    */
    //this.setState = {};

    this.Toast = React.createRef();

    this.state = {
        visible: false,
        persona: {
          id: null,
          name: "",
          age: 1,
          salary: 0,
          image: ""	
        },
        email: "",
        password: "",    
        everFocusedEmail: false,
        everFocusedPassword: false,
        inFocus: ""              
    };
    this.items = [
      {
        label : 'New',
        icon  : 'pi pi-fw pi-plus',
        //command: () => {alert('Saved')}
        command: () => {this.showSaveDialog()}
      },
      {
        label : 'Editar',
        icon  : 'pi pi-fw pi-pencil',
        command: () => {this.showEditDialog()}
      },      
      {
        label : 'Eliminar',
        icon  : 'pi pi-fw pi-trash',
        command: () => {alert('Deleted')}
      },   
      {
        label : 'Buscar',
        icon  : 'pi pi-fw pi-search',
        //command: () => {alert('Finded')}
        command: () => {this.showFindDialog()}
      }     
    ];
    this.personaService = new PersonaService();
    this.save = this.save.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );

  }

  componentDidMount(){
    
    this.personaService.getAll().then(data => {
      console.log(data);
      this.setState({personas: data});
    })
    
    /*
    this.personaService.getAll().then(
      data => this.setState({personas: data})
    );
    */
    /*
    this.setState({
      visible: false,
      persona: {
        id: null,
        name: null,
        age: null,
        salary: null,
        image: null	
      }
    });
    */
  }

  save() {
    this.personaService.save(this.state.persona).then(
      data => {
        console.log(data);
        this.setState({
          visible : false,
          persona: {
            name: "",
            age: 0,
            salary: 0,
            image: ""	
          }
        });
        this.Toast.current.show({severity: 'success', summary: 'Success Message', detail: 'Order submitted'});
        this.personaService.getAll().then(data => this.setState({personas: data}))
      }
    )
  }


  handleEmailChange = evt => {
    this.setState({ email: evt.target.value });
  };


  handleSubmit = evt => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    const { email,  } = this.state;
    alert(`Find an Employee with ID: ${email} `);
      window.location.href = "http://localhost:9090/api/v1/employee/" + email;
  };

  canBeSubmitted() {
    const errors = validate(this.state.email);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }  

  render() {
    const errors = validate(this.state.email);
    const isDisabled = Object.keys(errors).some(x => errors[x]);

    return (
      //<h1>Hola Rodry</h1>
      //<Panel header="Project Employee" style={{width:'80%', margin:'0 auto', marginTop:'40px' }}></Panel>
      //<Dialog header="Crear persona" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
      //</Dialog> 
      


      <div style={{width:'80%', margin:'0 auto', marginTop:'40px' }}>
      <div className="card">
          <h5>Rodrigo</h5>
          <Image src="Rlogo.png" alt="Image" width="250" />
      </div>

        <Menubar model={this.items} />
        <br/>
        <Panel header="Project Employee">
          <DataTable value={this.state.personas} >
            <Column field='id' header="ID"></Column>
            <Column field='name' header="Name"></Column>
            <Column field='age' header="Age"></Column>
            <Column field='salary' header="Salary"></Column>
            <Column field='image' header="Image"></Column>
          </DataTable>
        </Panel>
        <Dialog header="Crear persona" visible={this.state.visible} style={{width:'400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})} >
          <form id="personaform"  name='personaform'>
            <span className="p-float-label">
              <InputText value={this.state.persona.name} style={{width : '100%'}} id="name" onChange={(e) => {
                let val = e.target.value;
                console.log(val);
                this.setState(prevState => {
                    console.log("--- nombre ---");
                    console.log(prevState);
                    console.log(val);
                    let persona = Object.assign({}, prevState.persona);
                    persona.name = val;

                    return {persona};
                })}
              } />
              <label htmlFor="nombre">Nombre</label>
            </span>
            <br/>
            <span className="p-float-label">
              <InputText value={this.state.persona.age} style={{width : '100%'}} id="age" onChange={(e) => {
                let val = e.target.value;
                console.log(val);
                this.setState(prevState => {
                  console.log("--- age ---");
                  console.log(prevState);
                  console.log(val);
                  let persona = Object.assign({}, prevState.persona);
                  persona.age = val;

                  return {persona};
                })}
              } />
              <label htmlFor="age">age</label>
            </span>          
            <br/>
            <span className="p-float-label">
              <InputText value={this.state.persona.salary} style={{width : '100%'}} id="age" onChange={(e) => {
                let val = e.target.value;
                console.log(val);
                this.setState(prevState => {
                  console.log("--- salary ---");
                  console.log(prevState);
                  console.log(val);
                  let persona = Object.assign({}, prevState.persona);
                  persona.salary = val;

                  return {persona};
                })}
              } />
              <label htmlFor="salary">salary</label>
            </span> 



          </form>

        </Dialog>
        <Toast ref={this.Toast} />
        <br/>
        <br/>
        <div className="wrap">


        <form onSubmit={this.handleSubmit}>
          <input
            className={errors.email ? "error" : ""}
            type="text"
            placeholder="Enter ID"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          <button disabled={isDisabled}>Find an Employee</button>
        </form>



        </div>


      </div>
    );
  }



  

  floatFocus(args) {
    args.target.parentElement.classList.add('e-input-focus');
  }
  floatBlur(args) {
      args.target.parentElement.classList.remove('e-input-focus');
  }  

  checkFloatingLabel(id) {
    const inputElement = document.getElementById(id);
    const labelElement = inputElement.parentElement.querySelector('.e-float-text');
    if (inputElement.value !== '') {
        labelElement.classList.remove('e-label-bottom');
        labelElement.classList.add('e-label-top');
    }
    else {
        labelElement.classList.remove('e-label-top');
        labelElement.classList.add('e-label-bottom');
    }
  }


  showSaveDialog(){
    this.setState({
      visible : true,
      persona : {
        id: "",
        name: "",
        age: "",
        salary: 0,
        image: ""	
      }
    });
    //document.personaform.reset();
    //document.getElementById('personaform').reset();
  }

  showEditDialog(){
    this.setState({
      visible : true,
      persona : {
        id: "",
        name: "",
        age: "",
        salary: 0,
        image: ""	
      }
    });
    //document.personaform.reset();
    //document.getElementById('personaform').reset();
  }

  showFindDialog(){
    this.setState({
      visible : true,
      persona : {
        id: "",
      }
    });
    window.location.href = "http://localhost:9090/api/v1/employee/";
  }

}


//export default App;
