import { db } from "@/firebase";

export type PetStatus = "pending" | "approved" | "rejected";

export interface PetApproval {
  petId: string;
  status: PetStatus;
  createdAt: Date;
  approvedAt?: Date;
  rejectionReason?: string;
}

export const petApprovalService = {
  async approvePet(petId: string): Promise<void> {
    await db()
      .collection("pets")
      .doc(petId)
      .update({
        status: "approved",
        approvedAt: new Date(),
      });
  },

  async rejectPet(petId: string, reason?: string): Promise<void> {
    await db()
      .collection("pets")
      .doc(petId)
      .update({
        status: "rejected",
        rejectionReason: reason,
        rejectedAt: new Date(),
      });
  },

  async getPendingPets() {
    const querySnapshot = await db()
      .collection("pets")
      .where("status", "==", "pending")
      .get();

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async getApprovedPets() {
    const querySnapshot = await db()
      .collection("pets")
      .where("status", "==", "approved")
      .get();

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async getAllPetsWithStatus() {
    const querySnapshot = await db().collection("pets").get();

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },
};
