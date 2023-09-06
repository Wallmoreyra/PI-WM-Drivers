const {createTeamDb, getAllTeams, postAllTeams} = require('../controllers/teamsController');
const {teams} = require('../db');

const postTeamsHandler = async (req, res) =>{
    const {name} = req.body;

    try{
        const newTeam = await createTeamDb(name);
        res.status(200).json(newTeam);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};

const getTeamsHandler = async (req, res) =>{

    try{

        const response = await getAllTeams();
        const DbUpdate = await postAllTeams(response);
        res.status(200).json({teams: response, DbUpdate});
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};

// const DbLoad = async (req, res) => {
//     req = getAllTeams;
//     try {
//         for (const name of req) {
//             await Team.create({mame});
//         }
//         res.status(200).json(response);
//     } catch (error) {
//         res.status(400).json({error:error.message});
//     }
// };


module.exports = {
    postTeamsHandler, getTeamsHandler,// DbLoad
}