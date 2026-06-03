export function Saludar({titulo}){
    const nombre = 'Leonardo'
    const isLogged = true;
    return (
        <div>
            <h1>
                {isLogged?
                    'Bienvenido ' + nombre :
                    'Inicia Sesion'
                }
            </h1>
            <h2>{titulo}</h2>
        </div>
            )
}