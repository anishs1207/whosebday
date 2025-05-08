import prisma from "@/lib/db";

export async function GET (req: Request) {
    //done

    try {
       const url = new URL(req.url);
       const userId = url.searchParams.get("userId");
       const month = url.searchParams.get("month");

       console.log (userId, month);

        if (!userId || !month) {
            return Response.json ({
                success: false,
                message: "All Required Fields (userId & month) are not recevied",
                status: 400,
            })
        }
    
        const bdaysOfSpecifiedMonth = await prisma.birthday.findMany({
            where: {
                userId,
                month: parseInt(month, 10),
            }
        })
    
        if (!bdaysOfSpecifiedMonth || bdaysOfSpecifiedMonth.length == 0) {
            return Response.json ({
                success: true,
                message: "No bdays in specified month",
                status: 200,
            })
        }
    
        return Response.json ({
            success: true,
            message: "bdays fetched successfully",
            status: 200,
            data: bdaysOfSpecifiedMonth,
        })

    } catch (error) {
        console.log("DB Error", error);
        return Response.json ({
            success: false,
            message: "DB Error: /bdays-current-month",
            status: 500,
        })
    }
  
}

//imporbe it :
// import prisma from "@/lib/db";

// export async function GET(req: Request) {
//     try {
//         // Parse query parameters from URL
//         const url = new URL(req.url);
//         const userId = url.searchParams.get("userId");
//         const month = url.searchParams.get("month");

//         // Validate required fields
//         if (!userId || !month) {
//             return new Response(
//                 JSON.stringify({
//                     success: false,
//                     message: "Both 'userId' and 'month' are required",
//                     status: 400,
//                 }),
//                 { status: 400 }
//             );
//         }

//         // Fetch birthdays from the specified userId and month
//         const bdaysOfSpecifiedMonth = await prisma.birthday.findMany({
//             where: {
//                 userId,
//                 month,
//             },
//         });

//         // Check if any birthdays were found for the specified month
//         if (!bdaysOfSpecifiedMonth || bdaysOfSpecifiedMonth.length === 0) {
//             return new Response(
//                 JSON.stringify({
//                     success: true,
//                     message: "No birthdays found for the specified month",
//                     status: 200,
//                 }),
//                 { status: 200 }
//             );
//         }

//         // Return the found birthdays
//         return new Response(
//             JSON.stringify({
//                 success: true,
//                 message: "Birthdays fetched successfully",
//                 status: 200,
//                 data: bdaysOfSpecifiedMonth,
//             }),
//             { status: 200 }
//         );
//     } catch (error) {
//         console.error("DB Error:", error);
//         return new Response(
//             JSON.stringify({
//                 success: false,
//                 message: "Database error occurred while fetching birthdays",
//                 status: 500,
//             }),
//             { status: 500 }
//         );
//     }
// }
