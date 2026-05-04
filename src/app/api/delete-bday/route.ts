import prisma from "@/lib/db"

export async function DELETE(req: Request) {
  const url = new URL(req.url)
  const id = url.searchParams.get("id")

  if (!id) {
    return Response.json({ message: "ID is required" }, { status: 400 })
  }

  try {
    const deleted = await prisma.birthday.delete({
      where: { id },
    })

    // Invalidate caches
    try {
      const { invalidateUserCache, invalidateMonthlyCache } = await import("@/lib/redis");
      await invalidateUserCache(deleted.userId);
      await invalidateMonthlyCache(deleted.userId, deleted.month);
    } catch (cacheErr) {
      console.error("Cache invalidation error:", cacheErr);
    }

    return Response.json({ message: "Birthday deleted", deleted })
  } catch (error) {
    console.error("Error deleting birthday:", error)
    return Response.json(
      { message: "Error deleting birthday", error },
      { status: 500 }
    )
  }
}
