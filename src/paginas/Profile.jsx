import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'

import { pegaDados } from '../api';
import { Banner } from '../componentes';

const Profile = () => {

    let { id } = useParams();

    const [contas,setContas] = useState([]);

    let usuario = {}

    useEffect(() => {
        pegaDados(`/contas`, setContas)
    },[])

    for(let i=0;i<contas.length;i++){
        if(`:${contas[i].id}` === id){
            usuario = contas[i]
        }
    }
    
    if(id === undefined){
        return <div>ERRO Acesso negado</div>
    }else{
        <Banner/>
        return <div>Bem Vindo {usuario.nome}</div>
    }

}

export default Profile