export class DaoTestRepository {

    public async getTestRepo(){
        const mock = {
            name: "Juan",
            apellido: "Gutierrez",
            edad:23,
            estadoCivil:"soltero",
            madre:"doña alexa :v"
        }
        return mock;
    }
}