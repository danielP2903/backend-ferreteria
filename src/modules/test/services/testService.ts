import { DaoTestRepository } from '../repositories/daoTestRepository';
class TestService{

    public async getTest(){
      
        const daoRepo = new DaoTestRepository();
        const result  = await daoRepo.getTestRepo();
        return result;
    }
}
export default TestService