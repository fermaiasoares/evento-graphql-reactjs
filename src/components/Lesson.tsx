import { CheckCircle, Lock } from 'phosphor-react';
import { isPast, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';

interface LessonProps {
    title: string;
    slug: string;
    availableAt: Date;
    type: 'live' | 'class';
}

interface IProps {
    children: React.ReactNode;
    isLessonAvailable: boolean;
    slug: string;
}

function Slot({ children, isLessonAvailable, slug }: IProps) {
    if (isLessonAvailable) {
        return (
            <Link
                className="group"
                to={`/event/lesson/${slug}`}
            >
                {children}
            </Link>
        )
    } else {
        return (
            <div className="hover:cursor-not-allowed">{children}</div>
        )
    }
}

export function Lesson(props: LessonProps) {
    const navigate = useNavigate();
    const [active, setActive] = useState(false);
    const isLessonAvailable = isPast(props.availableAt);
    const availableDateFormatted = format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm'm", { locale: ptBR });

    const { pathname } = useLocation();

    useEffect(() => {
        setActive(false);
        const location = `/event/lesson/${props.slug}`;
        if (location === pathname) {
            if (!isLessonAvailable) {
                navigate('/event');
            }
            setActive(true);
            return;
        }
    }, [pathname]);

    return (
        <Slot
            isLessonAvailable={isLessonAvailable}
            slug={props.slug}
        >
            <span className="text-gray-300">
                {availableDateFormatted}
            </span>

            <div className={
                active
                    ? "rounded border p-4 mt-2 group-hover:border-green-900 group-hover:bg-green-900 border-green-500 bg-green-500 transition-colors"
                    : "rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 transition-colors"
            }>
                {active && <div className="absolute -z-0 -ml-6 mt-2 h-0 w-0 rotate-45 group-hover:border-green-900 group-hover:bg-green-900 transition-colors transform border-8 border-green-500"></div>}

                <header className="flex items-center justify-between">
                    {isLessonAvailable ? (
                        <span className={
                            active
                                ? "text-sm text-gray-200 font-medium flex items-center gap-2"
                                : "text-sm text-blue-500 font-medium flex items-center gap-2"
                        }>
                            <CheckCircle size={20} />
                            Conteúdo liberado
                        </span>
                    ) : (
                        <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                            <Lock size={20} />
                            Em breve
                        </span>
                    )}
                    <span className={
                        active
                            ? "text-xs rounded py-[2px] px-2 text-white-600 border border-gray-200"
                            : "text-xs rounded py-[2px] px-2 text-white-600 border border-green-500"
                    }>
                        {props.type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
                    </span>
                </header>
                <strong className="text-gray-200 mt-5 block">
                    {props.title}
                </strong>
            </div>
        </Slot>
    )
}