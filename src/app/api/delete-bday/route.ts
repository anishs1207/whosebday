import prisma from "@/lib/db"

export async function DELETE(req: Request) {
  const url = new URL(req.url)
  const id = url.searchParams.get("id")
  console.log (id)

  if (!id) {
    return Response.json({ message: "ID is required" }, { status: 400 })
  }

  try {
    const deleted = await prisma.birthday.delete({
      where: { id },
    })

    return Response.json({ message: "Birthday deleted", deleted })
  } catch (error) {
    console.error("Error deleting birthday:", error)
    return Response.json(
      { message: "Error deleting birthday", error },
      { status: 500 }
    )
  }
}
