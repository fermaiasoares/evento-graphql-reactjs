import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Logo } from "../components/Logo"
import { useCreateSubscriberMutation } from "../graphql/generated";

export function Landing() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [createSubscriber, { loading }] = useCreateSubscriberMutation();

    async function handleSubscriber(event: FormEvent) {
        event.preventDefault();
        await createSubscriber({
            variables: {
                name,
                email
            }
        });

        navigate('/event');
    }

    return (
        <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
            <img
                className="absolute -z-10"
                src="./assets/images/reactjs-icon.png"
                alt=""
            />

            <div className="w-full max-w-[1100px] flex flex-col md:flex-row items-center justify-between mt-20 mx-auto">
                <div className="max-w-[640px] items-center md:items-start flex flex-col">
                    <Logo />

                    <h1 className="mt-6 md:mt-8 text-3xl mx-6 md:text-4xl md:mx-0 text-center md:text-left leading-tight">
                        Construa uma {' '}
                        <strong className="text-blue-500">
                            aplicação completa
                        </strong>, do zero, com {' '}
                        <strong className="text-blue-500">
                            React JS
                        </strong>
                    </h1>
                    <p className="mt-6 mx-6 text-center md:ml-0 md:text-left text-gray-200 leading-relaxed">
                        Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
                    </p>
                </div>

                <div className="w-full md:max-w-[391px] p-8 mt-8 md:mt-0 bg-gray-700 border border-gray-500 rounded">
                    <strong className="text-xl">
                        Inscreva-se gratuitamente
                    </strong>

                    <form onSubmit={handleSubscriber} className="mt-6 flex flex-col gap-2 w-full">
                        <input
                            className="bg-gray-900 rounded px-5 h-14"
                            type="text"
                            placeholder="Seu nome completo"
                            onChange={event => setName(event.target.value)}
                        />
                        <input
                            className="bg-gray-900 rounded px-5 h-14"
                            type="email"
                            placeholder="Digite seu e-mail"
                            onChange={event => setEmail(event.target.value)}
                        />

                        <button
                            className="mt-4 uppercase bg-green-500 hover:bg-green-700 transition-colors p-4 text-sm rounded disabled:opacity-50"
                            type="submit"
                            disabled={loading}
                        >
                            Garantir minha vaga
                        </button>
                    </form>
                </div>
            </div>

            <img src="./assets/images/code-mockup.png" alt="" className="mt-10" />
            <div className="w-full bg-gray-700">
                <Footer />
            </div>
        </div>
    )
}