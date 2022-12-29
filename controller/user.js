const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const fastify = require('fastify');
const app = fastify();
const moment = require("moment");

module.exports ={
users :  async (request, reply) => {
    const { name, phone_number } = request.body;
    const ifUser = await prisma.user.findUnique({
        where: { phone_number: phone_number },
      });
      if (ifUser) {
        throw {
          status: 401,
          message: "User with this phone number already exists",
        };
      }
    const user = await prisma.user.create({
      data: {
        name,
        phone_number,
      },
    });
    reply.send(user);
  },
Opt: async (request, reply) => {
    try {
      const { phone_number } = request.body;
      if (!phone_number) {
        throw { status: 400, message: "Phone number is empty" };
      }
      const userfind = await prisma.user.findMany({
        where: { phone_number: phone_number },
      });
      if (!userfind) {
        throw { status: 400, message: "user doesnot exist" };
      }
      const otp = Math.floor(Math.random() * 10000);
      const user = await prisma.user.update({
        where: {
          phone_number: phone_number,
        },
        data:{
        otp: otp,
        otp_expiration_date: moment().unix() + 300000,
        }
      });
      reply.status(200).send({
        otp: user.otp,
        user: user.id,
      });
    } catch (err) {
      reply.status(err.status || 500).send(err.message || err);
    }
  },
verify: async (request, reply) => {
 
    try {
      
      const { userId } = request.params;
      const { otp } = request.query;
      if (!otp) {
        throw { status: 400, message: "Otp is required" };
      }
      const User = await prisma.user.findUnique({
        where: { id:parseInt(userId)},
      });
      if (!User) {
        throw { status: 404, message: "user not found" };
      }
      if ( User.otp != otp) {
        reply.status(401).send({ message: "otp expired or wrong" });
      } else {
        reply.status(200).send(User);
      }
  
    } catch (err) {
      console.log(err);
        reply.status(err.status || 500).send(err.message || err);
    }
    
  }
}


