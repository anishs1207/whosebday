import prisma from "@/lib/db";

export async function GET (req: Request) {
    //get the path params
    const url = new URL(req.url);
    const name = url.searchParams.get("name");
    const month = url.searchParams.get("month");
    const day = url.searchParams.get("day");
    const title = url.searchParams.get("title");
    const userId = url.searchParams.get ("userId")

    try {
          // name & role will be search boxes and month & day will be a drop down
    const whereClause: any = {};
    if (name) whereClause.name = name;
    if (month) whereClause.month = month;
    if (day) whereClause.day = day;
    if (title) whereClause.title = title;
    if (userId) whereClause.userId = userId;

    const filteredBdays = await prisma.birthday.findMany({
        where: whereClause
    });


    if  (!filteredBdays || filteredBdays.length == 0) {
        return Response.json ({
            success: true,
            message: "No bdays match the required filters",
            status: 200,
        })
    }

    return Response.json ({
        success: true,
        message: "Bdays fetched successfully",
        status: 200,
        data: filteredBdays,
    })

    

    } catch (error) {
        console.log ("DB Error: /filter-birthday", error);

        return Response.json ({
            success: false,
            message: "DB Error",
            status: 500,
        })

    }
}

//add the pagination oncepts:
// import prisma from "@/lib/db";
// import { z } from "zod";

// // Define a schema for query parameter validation
// const querySchema = z.object({
//   name: z.string().optional(),
//   month: z.string().optional(),
//   day: z.string().optional(),
//   title: z.string().optional(),
//   userId: z.string().optional(),
//   page: z.string().regex(/^\d+$/).transform(Number).default(1),  // default page is 1
//   limit: z.string().regex(/^\d+$/).transform(Number).default(10), // default limit is 10
// });

// export async function GET(req: Request) {
//   try {
//     // Get query params
//     const url = new URL(req.url);
//     const queryParams = Object.fromEntries(url.searchParams.entries());

//     // Validate query parameters using Zod
//     const validatedParams = querySchema.parse(queryParams);
//     const { name, month, day, title, userId, page, limit } = validatedParams;

//     // Create the where clause for filtering
//     const whereClause: Record<string, any> = {};
//     if (name) whereClause.name = { contains: name, mode: "insensitive" };
//     if (month) whereClause.month = month;
//     if (day) whereClause.day = day;
//     if (title) whereClause.title = { contains: title, mode: "insensitive" };
//     if (userId) whereClause.userId = userId;

//     // Fetch filtered birthdays with pagination
//     const filteredBdays = await prisma.birthday.findMany({
//       where: whereClause,
//       skip: (page - 1) * limit, // Pagination: skip results based on page
//       take: limit,              // Limit the number of results per page
//     });

//     // Get total count for pagination
//     const totalBdays = await prisma.birthday.count({ where: whereClause });

//     // If no birthdays match the filters
//     if (filteredBdays.length === 0) {
//       return new Response(
//         JSON.stringify({
//           success: true,
//           message: "No bdays match the required filters",
//         }),
//         { status: 200 }
//       );
//     }

//     // Return filtered birthdays with pagination info
//     return new Response(
//       JSON.stringify({
//         success: true,
//         message: "Bdays fetched successfully",
//         data: filteredBdays,
//         pagination: {
//           totalCount: totalBdays,
//           currentPage: page,
//           totalPages: Math.ceil(totalBdays / limit),
//           pageSize: limit,
//         },
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("DB Error: /filter-birthday", error);
//     return new Response(
//       JSON.stringify({
//         success: false,
//         message: "DB Error",
//       }),
//       { status: 500 }
//     );
//   }
// }
