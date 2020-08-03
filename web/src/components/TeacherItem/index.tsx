import React from 'react';
import wppIcon from '../../assets/images/icons/whatsapp.svg';

 import './styles.css';

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
        <header>
          <img src="https://avatars2.githubusercontent.com/u/61878136?s=460&u=e4b113d2332fdb1c09b3be7cb626923e86f89ae1&v=4" alt="gabriel"/>
        
          <div>
            <strong>Gabriel Pereira</strong>
            <span>Programação</span>
         </div>
        </header>
            <p>Entusiasta das melhores tecnologias de química avançada.
              <br/>
              Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.
            </p>
            
            <footer>
              <p>
                Preço/hora
                <strong>R$80,00</strong>
              </p>

              <button type='button' >
                <img src={wppIcon} alt="whatsapp"/>
                Entrar em contato.
              </button>
            </footer>
          
      </article>
  );
}

export default TeacherItem;