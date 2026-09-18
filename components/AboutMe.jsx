import Image from 'next/image'
import Link from 'next/link'

export default function AboutMe() {

    return (
        <main className="flex grow items-start justify-center px-4">
            <div className="my-12 w-full max-w-3xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-yellow-800/10 sm:my-16 sm:p-10">
                <div className="text-4xl font-bold">
                    <h1>Sobre mí</h1>
                    <div className="mt-3 h-1 w-16 rounded-full bg-yellow-800/30"></div>
                </div>

                <div className="flex justify-center py-8">
                    <Image src="/profile.jpg" height={320} width={250} alt='María, autora de Tartas Sweet Sugar' className="rounded-2xl shadow-lg shadow-yellow-800/20 ring-4 ring-yellow-100" />
                </div>

                <div className="py-3 text-lg leading-relaxed">
                    Me llamo María y, como podéis ver no solo me gustan los dulces... ¡sino que también me encanta
                    hacerlos!
                </div>
                <div className="py-3 text-lg leading-relaxed">
                    Desde siempre me ha gustado la repostería, pero fue estudiando cocina cuando realmente me di
                    cuenta de que lo mío eran los postres. Me gustaba dedicarles tiempo y mimo para que quedaran
                    ricos y apetitosos.
                </div>
                <div className="py-3 text-lg leading-relaxed">
                    Recuerdo en especial un día en que todo nos estaba saliendo mal en clase... se quemaban las
                    cremas, no fermentaban los bollos... un desastre, y la profesora vino a pedirme unas natillas porque
                    necesitábamos algo que poder servir. Cuando terminé de hacerlas y ella vino a probarlas me dio un
                    abrazo y las gracias. Aquello me hizo sentir tan bien que no tardé en comenzar a hacer tartas y
                    postres caseros, hasta llegar al punto en que cuando la familia entra por la puerta ya espera que esté
                    preparando algo.
                </div>
                <div className="py-3 text-lg leading-relaxed">
                    Hace tiempo, con las nuevas tendencias de fondant y glaseados, descubrí que podía unir mi oficio de
                    diseñadora a mi hobbie de repostera y me puse manos a la obra.
                </div>
                <div className="py-3 text-lg leading-relaxed">
                    Ahora, con ganas de nuevos retos, he decidido publicar mis creaciones esperando que os gusten y
                    que si os apetece me hagais peticiones para que las podais ver hechas realidad.
                </div>
                <div className="py-3 text-lg leading-relaxed wrap-break-word">
                    Si os quereis poner en contacto conmigo podeis hacerlo desde el correo electrónico <Link className="font-bold underline decoration-2 underline-offset-4 hover:opacity-80" href="mailto:tartassweetsugar@gmail.com">tartassweetsugar@gmail.com</Link>
                </div>
            </div>
        </main>
    )
}