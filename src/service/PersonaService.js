//import React from 'react';

import axios from 'axios';

export class PersonaService {
    baseUrl = "http://localhost:9090/api/v1/";

    getAll() {
        return axios.get(this.baseUrl + "employees").then(res => res.data.data);
        //return axios.get(this.baseUrl + "callclientHello").then(res => res.data.data);
    }

    save(persona) {
        return axios.post(this.baseUrl + "save", persona).then(res => res.data);
    }

    
}