'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('MenuMakanans', [
      {
        nama: "Nasi Goreng",
        harga: "15000",
        deskripsi: "Nasi goreng khas Indonesia dengan bumbu rempah yang kaya, ditambah dengan irisan ayam, telur, dan sayuran segar. Hidangan ini disajikan dengan kerupuk renyah dan acar timun untuk memberikan sentuhan segar pada setiap suapan.",
        foto: "/uploads/Nasi_Goreng.jpg",
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: "Mie Goreng",
        harga: "12000",
        deskripsi: "Mie goreng yang lezat dengan bumbu pedas manis, dilengkapi dengan potongan ayam, bakso, dan sayuran segar. Mie ini dimasak dengan sempurna hingga teksturnya kenyal dan disajikan dengan taburan bawang goreng yang gurih.",
        foto: "/uploads/Mie_Goreng.jpg",
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: "Sate Ayam",
        harga: "20000",
        deskripsi: "Sate ayam yang empuk dengan bumbu kacang yang kaya rasa. Daging ayam dipotong dadu dan dipanggang hingga matang sempurna, disajikan dengan lontong, sambal, dan kecap manis untuk menambah kelezatan.",
        foto: "/uploads/Sate_Ayam.jpg",
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: "Bakso",
        harga: "15000",
        deskripsi: "Bakso sapi yang kenyal dengan kuah kaldu yang gurih dan hangat. Disajikan dengan mie, tahu, dan sayuran segar, bakso ini cocok dinikmati pada saat cuaca dingin. Tambahan sambal dan kecap membuat rasanya semakin mantap.",
        foto: "/uploads/Bakso.jpg",
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: "Ayam Geprek",
        harga: "18000",
        deskripsi: "Ayam geprek yang pedas dan renyah, dihidangkan dengan nasi hangat. Ayam digoreng dengan tepung crispy dan diulek dengan sambal bawang yang pedas. Hidangan ini menjadi favorit bagi para pecinta makanan pedas.",
        foto: "/uploads/Ayam_Geprek.jpg",
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: "Nasi Uduk",
        harga: "13000",
        deskripsi: "Nasi uduk dengan rasa gurih yang khas, disajikan dengan ayam goreng, tempe, tahu, dan sambal kacang. Nasi ini dimasak dengan santan dan daun pandan, menghasilkan aroma yang menggoda dan rasa yang lezat.",
        foto: "/uploads/Nasi_Uduk.jpg",
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: "Rendang",
        harga: "25000",
        deskripsi: "Rendang daging sapi yang dimasak perlahan dengan bumbu rempah-rempah khas Padang. Dagingnya empuk dan kaya akan rasa, disajikan dengan nasi putih hangat. Hidangan ini merupakan salah satu makanan favorit di Indonesia.",
        foto: "/uploads/Rendang.jpg",
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: "Gado-Gado",
        harga: "14000",
        deskripsi: "Gado-gado adalah salad sayuran yang disajikan dengan bumbu kacang yang khas. Terdiri dari berbagai sayuran rebus, tempe, tahu, dan telur rebus, gado-gado merupakan hidangan yang sehat dan lezat. Bumbu kacangnya memberikan rasa manis, gurih, dan sedikit pedas.",
        foto: "/uploads/Gado-Gado.jpg",
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: "Soto Ayam",
        harga: "15000",
        deskripsi: "Soto ayam dengan kuah bening yang gurih, dilengkapi dengan ayam suwir, telur rebus, dan sayuran segar. Hidangan ini disajikan dengan nasi putih dan sambal untuk memberikan rasa pedas yang pas.",
        foto: "/uploads/Soto_Ayam.jpg",
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: "Pempek",
        harga: "17000",
        deskripsi: "Pempek Palembang yang terbuat dari ikan tenggiri, disajikan dengan cuko yang kental dan asam manis pedas. Teksturnya kenyal dan rasanya lezat, cocok untuk camilan atau makanan ringan.",
        foto: "/uploads/Pempek.jpg",
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MenuMakanans', null, {});
  }
};
