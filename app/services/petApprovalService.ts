import { db } from "@/firebase";

export const petApprovalService = {
  async approvePet(petId: string): Promise<void> {
    await db()
      .collection("pets")
      .doc(petId)
      .update({
        isApproved: true,
        approvedAt: new Date(),
      });
  },

  async rejectPet(petId: string, reason?: string): Promise<void> {
    await db()
      .collection("pets")
      .doc(petId)
      .update({
        isApproved: false,
        rejectionReason: reason,
        rejectedAt: new Date(),
      });
  },

  async getPendingPets() {
    const querySnapshot = await db()
      .collection("pets")
      .where("isApproved", "==", false)
      .get();

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async getApprovedPets() {
    const querySnapshot = await db()
      .collection("pets")
      .where("isApproved", "==", true)
      .get();

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async getAllPetsWithApprovalStatus() {
    const querySnapshot = await db().collection("pets").get();

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },
};
