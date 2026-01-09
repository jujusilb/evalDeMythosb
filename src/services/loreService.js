import { prisma } from "../prismaClient.js";
import { ApiError } from "../errors/ApiError.js";
import { asInt, isTaskStatus } from "../utils/validators.js";


export const loreService = {
  async createCreature(payload) {
  const {
    title,
    description = "",
    status = "TODO",
    priority = 2,
    dueDate,
    userId,
    authorId,
    validatedBy,
    validatedAt,
  } = payload || {};

    if (!title || String(title).trim().length < 3) {
      throw new ApiError(400, "Title must be >= 3 chars");
    }

    if (!isTaskStatus(status)) {
      throw new ApiError(400, "Invalid status");
    }

    const p = asInt(priority);
    if (!Number.isFinite(p) || p < 1 || p > 3) {
      throw new ApiError(400, "Priority must be 1..3");
    }

    let due = null;
    if (dueDate) {
      const d = new Date(dueDate);
      if (Number.isNaN(d.getTime())) throw new ApiError(400, "Invalid dueDate");
      due = d;
    }

    if (status === "DONE" && due && due.getTime() > Date.now()) {
      throw new ApiError(400, "DONE task cannot have a future dueDate");
    }

    let finalUserId = null;
    if (userId !== undefined && userId !== null) {
      const uid = asInt(userId);
      if (!Number.isFinite(uid)) throw new ApiError(400, "Invalid userId");

      const userExists = await prisma.user.findUnique({
        where: { id: uid },
        select: { id: true },
      });
      if (!userExists) throw new ApiError(404, "User not found");
      finalUserId = uid;
    }

    const task = await prisma.task.create({
      data: {
        title: String(title).trim(),
        description: description ? String(description).trim() : null,
        status,
        priority: p,
        dueDate: due,
        userId: finalUserId,
      },
    });

    return task;
  },

  async listTasks(query) {
    const { status, priority, userId, overdue } = query || {};

    const where = {};

    if (status !== undefined && status !== null && status !== "") {
      if (!isTaskStatus(status)) throw new ApiError(400, "Invalid status");
      where.status = status;
    }

    if (priority !== undefined && priority !== null && priority !== "") {
      const p = asInt(priority);
      if (!Number.isFinite(p) || p < 1 || p > 3) {
        throw new ApiError(400, "Priority must be 1..3");
      }
      where.priority = p;
    }

    if (userId !== undefined && userId !== null && userId !== "") {
      const uid = asInt(userId);
      if (!Number.isFinite(uid)) throw new ApiError(400, "Invalid userId");
      where.userId = uid;
    }

    if (overdue === "true") {
      // dueDate < now AND status != DONE
      where.AND = [
        { dueDate: { lt: new Date() } },
        { status: { not: "DONE" } },
      ];
    }

    const tasks = await prisma.task.findMany({
      where,
      orderBy: [{ id: "asc" }],
    });

    return { count: tasks.length, items: tasks };
  },

  async updateTask(idRaw, payload) {
    const id = asInt(idRaw);
    if (!Number.isFinite(id)) throw new ApiError(400, "Invalid id");

    const existing = await prisma.task.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "Task not found");

    const { title, description, status, priority, dueDate } = payload || {};

    const data = {};

    if (title !== undefined) {
      if (String(title).trim().length < 3) throw new ApiError(400, "Title must be >= 3 chars");
      data.title = String(title).trim();
    }

    if (description !== undefined) {
      data.description = description ? String(description).trim() : null;
    }

    if (status !== undefined) {
      if (!isTaskStatus(status)) throw new ApiError(400, "Invalid status");
      data.status = status;
    }

    if (priority !== undefined) {
      const p = asInt(priority);
      if (!Number.isFinite(p) || p < 1 || p > 3) throw new ApiError(400, "Priority must be 1..3");
      data.priority = p;
    }

    if (dueDate !== undefined) {
      if (dueDate === null) data.dueDate = null;
      else {
        const d = new Date(dueDate);
        if (Number.isNaN(d.getTime())) throw new ApiError(400, "Invalid dueDate");
        data.dueDate = d;
      }
    }

    // validation métier après merge (pour le cas DONE + future dueDate)
    const merged = { ...existing, ...data };
    if (merged.status === "DONE" && merged.dueDate) {
      const dt = new Date(merged.dueDate);
      if (dt.getTime() > Date.now()) {
        throw new ApiError(400, "Cannot mark DONE with future dueDate");
      }
    }

    const task = await prisma.task.update({
      where: { id },
      data,
    });

    return task;
  },

  async deleteTask(idRaw) {
    const id = asInt(idRaw);
    if (!Number.isFinite(id)) throw new ApiError(400, "Invalid id");

    const existing = await prisma.task.findUnique({ where: { id }, select: { id: true } });
    if (!existing) throw new ApiError(404, "Task not found");

    await prisma.task.delete({ where: { id } });
    return { ok: true };
  },
};
