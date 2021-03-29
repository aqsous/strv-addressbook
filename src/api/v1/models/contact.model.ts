/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         address:
 *           type: string
 *         userId:
 *           type: string
 */
export interface IContact {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address?: string;
  userId: string;
}
