import { Textarea } from '../../Components/Textarea';
import { NoteItem } from '../../Components/Noteitem';
import { Section } from '../../Components/Section';
import { Button } from '../../Components/Button';
import { ButtonText } from '../../Components/ButtonText';
import { Input } from '../../Components/Input'
import { Header } from '../../Components/Header'

import swal from 'sweetalert';

import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

import { Container, Form } from './styles';

import { api } from '../../services/api';

export function New() {

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState("");

    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");

    const navigate = useNavigate();

    function handleAddLink() {
        setLinks(prevState => [...prevState, newLink]);
        setNewLink("");
    }

    function handleRemoveLink(linkDeleted) {
        setLinks(prevState => prevState.filter(link => link !== linkDeleted));
    }

    function handleAddTag() {
        setTags(prevState => [...prevState, newTag]);
        setNewTag("");
    }

    function handleRemoveTag(tagDeleted) {
        setTags(prevState => prevState.filter(tag => tag !== tagDeleted))
    }

    function handleBack() {
        navigate(-1);
    }

    async function handleNewNote() {
        if (!title) {
            return swal("Digite o título da nota");
        }

        if (newLink) {
            return swal("Você deixou um link no campo para adionar, mas não clicou em adicionar. Clique para adicionar ou deixe o campo vazio.");
        }

        if (newTag) {
            return swal("Você deixou uma tag no campo para adionar, mas não clicou em adicionar. Clique para adicionar ou deixe o campo vazio.");
        }


        await api.post("/notes", {
            title,
            description,
            tags,
            links
        })

        swal("Nota criada com sucesso!");
        navigate(-1);
    }

    return (
        <Container>
            <Header />
            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <ButtonText
                            title="Voltar"
                            onClick={handleBack}
                        />
                    </header>

                    <Input
                        placeholder="Título"
                        onChange={e => setTitle(e.target.value)}
                    />
                    <Textarea
                        placeholder="Observações"
                        onChange={e => setDescription(e.target.value)}
                    />

                    <Section title="Link úteis">
                        {
                            links.map((link, index) => (
                                <NoteItem
                                    key={String(index)}
                                    value={link}
                                    onClick={() => handleRemoveLink(link)}
                                />
                            ))
                        }
                        < NoteItem
                            isNew
                            placeholder="Novo link"
                            onChange={e => setNewLink(e.target.value)}
                            value={newLink}
                            onClick={handleAddLink}
                        />
                    </Section>

                    <Section title="Marcadores">
                        <div className="tags">
                            {
                                tags.map((tag, index) => (
                                    <NoteItem
                                        key={String(index)}
                                        value={tag}
                                        onClick={() => handleRemoveTag(tag)}
                                    />
                                ))
                            }


                            <NoteItem
                                isNew
                                placeholder="Nova tag"
                                onChange={e => setNewTag(e.target.value)}
                                value={newTag}
                                onClick={handleAddTag}
                            />
                        </div>
                    </Section>

                    <Button
                        title="Salvar"
                        onClick={handleNewNote}
                    />

                </Form>
            </main>
        </Container>
    );
};