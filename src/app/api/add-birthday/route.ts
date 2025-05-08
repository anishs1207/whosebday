// add birthday api end point (/api/add-birthday)

import prisma from "@/lib/db"

export const BirthdaySchema = {
    day: Number,
    month: Number,
    name: String,
    title: String,
    userId: String,
}

export async function POST (req: Request) {

    try {
        const { day, month, name, title, userId} = await req.json();
        console.log (day, month, name, title, userId );

    if (!day || !month || !name || !title || !userId) {
        return Response.json ({
            status: 400,
            success: false,
            message: "All Required fields are not provided",
        })
    }

    const createdBirthday = await prisma.birthday.create ({
        data: {
            day,
            month,
            name,
            title,
            userId,  
        }
    })

    console.log ("New Birthday", createdBirthday);
    
    //check if added successfully

    const newBirthday = await prisma.birthday.findUnique ({
        where: {
            id: createdBirthday.id,
        }
    })

    if (!newBirthday) {
        return Response.json ({
            message: "Error storing the Birthday",
            status: 500,
            success: false,
        })
    }

    return Response.json ({
        success: true,
        message: "Bday added successfully",
        data: newBirthday,
    })

    } catch (error) {
        console.error ("Error with DB while adding BDay", error);
    }
    
    
} 
