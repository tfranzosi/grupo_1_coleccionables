const queries = require('../../database/queries/index');

const apiUserController = {
    list: async (req, res) => {
        try {
            //Tomamos parametros de la ruta
            let pageNumber = 1;
            if (req.query.page !== undefined) pageNumber = parseInt(req.query.page);
            let itemsPerPage = 4;
            if (req.query.limit !== undefined) itemsPerPage = parseInt(req.query.limit);

            //Hago los pedidos a la Base de Datos
            const userCount = await queries.User.searchCount('');
            const pageCount = Math.ceil(userCount/itemsPerPage);
            const users = await queries.User.search('',itemsPerPage,pageNumber - 1);

            let previousPage = `http://localhost:3001/api/users?page=${pageNumber - 1}`;
            if (itemsPerPage != 6) previousPage += `&limit=${itemsPerPage}`;
            if (pageNumber <= 1) previousPage = null;
            
            let nextPage = `http://localhost:3001/api/users?page=${pageNumber + 1}`;
            if (itemsPerPage != 6) nextPage += `&limit=${itemsPerPage}`;
            if (pageNumber >= pageCount) nextPage = null;



/*             //Hago los pedidos a la Base de Datos
            
            // const categoryCount = await queries.Category.countProductByCategory();
            const users = await queries.User.showAll(); */

            const allUsers = users.map( user => {
                return {
                    id: user.id,
                    name: `${user.first_name} ${user.last_name}`,
                    email: user.email,
                    detail: `/usuarios/${user.id}`
                }
            })

            return res.status(200).json({
                count: userCount,
                previousPage,
                nextPage,
                users: allUsers
            })
        } catch (e) {
            //Si hay algun error, los atajo y muestro todo vacio
            console.log('error,' , e);
            return res.status(400).json(e);
        }
    },
    detail: async (req,res) => {
        try {
            //Hago los pedidos a la Base de Datos
            const user = await queries.User.findById(req.params.id);
            // const userDetail = [user].map( user => {
            //     return {
            //         id: user.id,
            //         name: user.first_name,
            //         email: user.email,
            //         detail: `/usuarios/${user.id}`
            //     }
            // }) Este map devuelve un array y el entregable pide un objeto literal por eso dejamos comentado.

            return res.status(200).json({
                id: user.dataValues.id,
                first_name: user.dataValues.first_name,
                last_name: user.dataValues.last_name,
                user: user.dataValues.user,
                phone_country: user.dataValues.phone_country,
                phone_number: user.dataValues.phone_number,
                email: user.dataValues.email,
                birdth_date: user.dataValues.birdth_date,
                gender: user.dataValues.gender,
                image_url: user.dataValues.image_url
            })
        } catch (e) {
            //Si hay algun error, los atajo y muestro todo vacio
            console.log('error,' , e);
            return res.status(400).json(e);
        }
    },
    lastUser: async (req,res) => {
        try {
            const user = await queries.User.lastUser();
            return res.status(200).json({
                first_name: user.dataValues.first_name,
                last_name: user.dataValues.last_name,
                user: user.dataValues.user,
                birth_date: user.dataValues.birth_date,
                gender: user.dataValues.genders.name,
                image_url: `http://localhost:3001${user.dataValues.image_url}`
            })
        } catch (e) {
            console.log('error,' , e);
            return res.status(400).json(e);
        }
    }
}


module.exports = apiUserController;