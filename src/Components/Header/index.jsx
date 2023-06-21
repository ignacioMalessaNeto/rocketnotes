import { RiShutDownLine} from 'react-icons/ri';

import { api } from "../../services/api";

import { useAuth } from "../../hooks/auth"

import { Container, Profile, Logout } from './styles';

import { useNavigate } from 'react-router-dom';

import avatarPlaceHolder from '../../assets/placeHolder.svg';


export function Header(){
    const {signOut, user} = useAuth();

    const navigation = useNavigate();

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceHolder;

    function handleSignOut(){
        navigation("/")
        signOut();
    } 

    return(
        <Container>

            <Profile to="/profile">
                <img 
                    src={avatarUrl}
                    alt={user.name}
                />

                <div>
                    <span>Bem-vindo</span>
                    <strong>{user.name}</strong>
                </div> 
            </Profile>

            <Logout onClick={handleSignOut}>
                <RiShutDownLine />
            </Logout>
        </Container>
    )
}