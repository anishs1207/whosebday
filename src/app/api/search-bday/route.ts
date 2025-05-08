import prisma from "@/lib/db"

export async function GET(req: Request) {
  const url = new URL(req.url)

  const searchTerm = url.searchParams.get("searchTerm") || ""
  const day = url.searchParams.get("day")
  const month = url.searchParams.get("month")
  const userId = url.searchParams.get ("userId")

  const page = parseInt(url.searchParams.get("page") || "1", 10)
  const limit = parseInt(url.searchParams.get("limit") || "6", 10)
  const skip = (page - 1) * limit

  try {
    const totalItems = await prisma.birthday.count({
      where: {
        AND: [
          searchTerm
            ? {
                OR: [
                  {
                    name: {
                      startsWith: searchTerm,
                      mode: "insensitive",
                    },
                  },
                  {
                    title: {
                      startsWith: searchTerm,
                      mode: "insensitive",
                    },
                  },
                ],
              }
            : {},
          day ? { day: Number(day) } : {},
          month ? { month: Number(month) } : {},
          userId ? { userId: userId } : {},
        ],
      },
    })

    const results = await prisma.birthday.findMany({
      where: {
        AND: [
          searchTerm
            ? {
                OR: [
                  {
                    name: {
                      startsWith: searchTerm,
                      mode: "insensitive",
                    },
                  },
                  {
                    title: {
                      startsWith: searchTerm,
                      mode: "insensitive",
                    },
                  },
                ],
              }
            : {},
          day ? { day: Number(day) } : {},
          month ? { month: Number(month) } : {},
          userId ? { userId: userId } : {},
        ],
      },
      skip,
      take: limit,
      orderBy: {
        name: "asc",
      },
    })

    return Response.json({
      data: results,
      meta: {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
        perPage: limit,
      },
    })
  } catch (error) {
    console.error("Error fetching birthdays:", error)
    return Response.json(
      { message: "Something went wrong", error },
      { status: 500 }
    )
  }
}
