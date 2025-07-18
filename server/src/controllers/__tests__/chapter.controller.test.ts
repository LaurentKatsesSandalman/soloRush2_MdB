import { vi } from "vitest";
import { getThisChapter } from "../chapter.controller";
import { Request, Response } from "express";
import { findChapterById } from "../../models/chapter.model";
import type { Chapter } from "../../types/types";

vi.mock("../../models/chapter.model");

const mockChapter = {
    story_id: 1,
    chapter_id: 1,
    chapter_desc: "la chambre",

    exit1_id: 2,
    exit1_desc: "la porte",

    exit2_id: 3,
    exit2_desc: "la fenetre",
    exit2_contrainte: 1,
    exit2_ztarget: 1,
} as Chapter;

const mockedFindChapterById = vi.mocked(findChapterById);

describe(`test getThisChapter`, () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const res: Partial<Response> = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
    };

    const next = vi.fn();

    it(`should be called with 400 if id NaN`, async () => {
        const req: Partial<Request> = {
            params: {
                id: "a",
            },
        };

        await getThisChapter(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "L'id du chapter est censée être numérique",
        });
    });

    it(`should return chapter if id is a number`, async () => {
        const req: Partial<Request> = {
            params: {
                id: "1",
            },
        };

        mockedFindChapterById.mockResolvedValue(mockChapter);
        await getThisChapter(req as Request, res as Response, next);

        expect(mockedFindChapterById).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith(mockChapter);
        expect(next).not.toHaveBeenCalled();
    });

    it(`should return error 404 if chapter not found but numeric id`, async () => {
        const req: Partial<Request> = {
            params: {
                id: "1",
            },
        };

        mockedFindChapterById.mockResolvedValue(undefined);
        await getThisChapter(req as Request, res as Response, next);

        expect(mockedFindChapterById).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            error: "Pas de Chapitre avec cet Id",
        });
        
    });
});
