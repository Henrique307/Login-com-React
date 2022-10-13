import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'

import { Banner } from '../componentes';

const PaginaUsuario = () => {
    
    return (
        <div>
            <Banner/>
            <div>Bem Vindo</div>
        </div>
    )

}

export default PaginaUsuario