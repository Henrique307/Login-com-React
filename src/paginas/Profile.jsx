import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'

import { pegaDados } from '../api';
import { Banner } from '../componentes';

const Profile = () => {

    let { id } = useParams();

    const [contas,setContas] = useState([]);
    
    useEffect(() => {
        pegaDados("/contas", setContas);
    }, []);
    
    let usuario = ''

    for(let i=0;i<contas.length;i++){
        if(`:${contas[i].id}` === id){
            usuario = contas[i]
        }
    }

    
    return (
        <div>
            <Banner/>
            <div>Bem Vindo {usuario.nome}</div>
        </div>
    )


}

export default Profile