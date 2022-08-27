import Image from 'next/image'

export default function AboutMe() {

    return (
        <main className="bg-yellow-100 text-yellow-800 bottom-28 top-28 flex-grow flex justify-center">
            <div className="bg-white max-w-screen-lg mx-4 px-6 lg:px-12 py-8 my-16">
                <div className="text-4xl py-2 font-bold">
                    <h1>Sobre mí</h1>
                </div>

                <div className="py-8 flex justify-center">
                    <Image src="/profile.jpg" height={320} width={250} />
                </div>

                <div className="text-xl py-4">
                    Me llamo María y, como podéis ver no solo me gustan los dulces... ¡sino que también me encanta
                    hacerlos!
                </div>
                <div className="text-xl py-4">
                    Desde siempre me ha gustado la repostería, pero fue estudiando cocina cuando realmente me di
                    cuenta de que lo mío eran los postres. Me gustaba dedicarles tiempo y mimo para que quedaran
                    ricos y apetitosos.
                </div>
                <div className="text-xl py-4">
                    Recuerdo en especial un día en que todo nos estaba saliendo mal en clase... se quemaban las
                    cremas, no fermentaban los bollos... un desastre, y la profesora vino a pedirme unas natillas porque
                    necesitábamos algo que poder servir. Cuando terminé de hacerlas y ella vino a probarlas me dio un
                    abrazo y las gracias. Aquello me hizo sentir tan bien que no tardé en comenzar a hacer tartas y
                    postres caseros, hasta llegar al punto en que cuando la familia entra por la puerta ya espera que esté
                    preparando algo.
                </div>
                <div className="text-xl py-4">
                    Hace tiempo, con las nuevas tendencias de fondant y glaseados, descubrí que podía unir mi oficio de
                    diseñadora a mi hobbie de repostera y me puse manos a la obra.
                </div>
                <div className="text-xl py-4">
                    Ahora, con ganas de nuevos retos, he decidido publicar mis creaciones esperando que os gusten y
                    que si os apetece me hagais peticiones para que las podais ver hechas realidad.
                </div>
                <div className="text-xl py-4 break-words">
                    Si os quereis poner en contacto conmigo podeis hacerlo desde el correo electrónico <a className="font-bold" href="mailto:tartassweetsugar@gmail.com">tartassweetsugar@gmail.com</a>
                </div>
            </div>
        </main>
    )
}