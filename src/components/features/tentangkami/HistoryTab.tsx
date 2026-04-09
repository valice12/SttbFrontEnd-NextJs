'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { Users } from 'lucide-react';

interface HistoryTabProps {
  isMounted: boolean;
  images: {
    sejarah1: string;
    sejarah2: string;
    sejarah3: string;
    imgCaleb: string;
    imgJoseph: string;
    imgDorothy: string;
  };
}

export function HistoryTab({ isMounted, images }: HistoryTabProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef as React.RefObject<HTMLDivElement>,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const lineHeight = useTransform(scaleY, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-transparent"
    >
      <div className="relative pl-12 space-y-12 pb-8" ref={timelineRef}>
        {/* Background Garis Mati (Abu-abu Pudar) */}
        <div className="absolute top-2 bottom-0 left-[2px] w-[3px] bg-gray-200 z-0"></div>

        {/* Garis Gradient yang Bergerak Sesuai Scroll — only after hydration */}
        {isMounted && (
          <motion.div
            className="absolute top-2 left-[2px] w-[3px] bg-gradient-to-b from-[#E31D1A] via-[#092C74] to-[#092C74] z-0 origin-top"
            style={{ height: lineHeight }}
          />
        )}

        {/* Item 1: 1992 - 1998 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute -left-[54px] top-1.5 h-6 w-6 bg-[#092C74] border-[4px] border-[#E31D1A] z-10 box-content"></div>
          <div className="bg-[#F8F9FA] p-8 rounded-sm">
            <h3 className="text-xl font-bold text-[#092C74] mb-3">1992 - 1998</h3>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              Pdt. Caleb Tong, Pdt. Joseph Tong, dan Pdt. Dorothy I. Marx mendirikan STTB pada tahun 1992 dengan tujuan menghasilkan Pastor-Scholar yg memiliki kerangka teologi Reformed Injili dalam konteks pekerjaan Tuhan di Indonesia. Pdt. Daniel Lucas Lukito sebagai Dekan Akademik pertama banyak berperan dalam meletakkan kerangka dasar pembangunan STTB. Pembukaan STTB disiapkan sangat baik dengan jajaran dosen yang berkualitas. Komitmen untuk mengejar kualitas akademis yg tinggi didukung juga oleh perpustakaan yang memiliki koleksi buku dan jurnal yang sangat memadai, serta penerbitan Jurnal Teologi STULOS dalam versi Bahasa Indonesia dan Inggris. Pada tahun-tahun pertama diselenggarakan acara dengan lingkup nasional yaitu Ferakristal (Festival Remaja Kristen Pencinta Alkitab). Wisuda pertama diadakan pada tahun 1996.
            </p>
          </div>
        </motion.div>

        {/* Item 2: 1999 - 2005 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute -left-[54px] top-1.5 h-6 w-6 bg-[#092C74] border-[4px] border-[#E31D1A] z-10 box-content"></div>
          <div className="bg-[#F8F9FA] p-8 rounded-sm">
            <h3 className="text-xl font-bold text-[#092C74] mb-3">1999 - 2005</h3>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              STTB mengalami pergantian pemimpin dan jajaran dosen. Ibu Dorothy I. Marx menjabat sebagai Rektor dan STTB terus melanjutkan kiprahnya atas anugerah Tuhan dengan membuka program-program studi baru: M.A. (Master of Arts/Magister Artium) untuk memperlengkapi kaum awam dan M.Th. (Master of Theology/Magister Teologi) untuk memperlengkapi para hamba Tuhan yang rindu berkiprah di dunia akademis. Asrama dosen dibangun bersebelahan dengan asrama mahasiswa. STTB berkomitmen menerbitkan seri buku “Sola…” dan menyelenggarakan acara nasional bagi pemuda dengan nama CYLF (Christian Youth Leadership Forum).
            </p>
          </div>
        </motion.div>

        {/* Item 3: 2006 - 2010 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute -left-[54px] top-1.5 h-6 w-6 bg-white border-[4px] border-[#092C74] z-10 box-content"></div>
          <div className="bg-[#F8F9FA] p-8 rounded-sm">
            <h3 className="text-xl font-bold text-[#092C74] mb-3">2006 - 2010</h3>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              Perkembangan STTB berlanjut dalam kepemimpinan Pdt. Joseph Tong yang berkomitmen meningkatkan kualifikasi tenaga pengajar dengan mengutus beberapa dosen untuk studi lanjut di USA. Pada periode ini terbit dua buku Seri Sola, yaitu Sola Scriptura dan Sola Fide. Dalam periode ini STTB membuka program studi berbahasa Mandarin (S.Th., M.Div., dan M.A.) sebagai kontribusinya dalam pelayanan misi di Tiongkok. Untuk itu 2 dosen yaitu Pdt. Lee Ching Yen dan Pdt. Joseph Lin dari Taiwan diundang mengajar para mahasiswa yang datang dari Tiongkok.
            </p>
          </div>
        </motion.div>

        {/* Item 4: 2011 - 2016 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute -left-[54px] top-1.5 h-6 w-6 bg-white border-[4px] border-[#092C74] z-10 box-content"></div>
          <div className="bg-[#F8F9FA] p-8 rounded-sm">
            <h3 className="text-xl font-bold text-[#092C74] mb-3">2011 - 2016</h3>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              Periode ini ditandai dengan beberapa perkembangan yang signifikan. Pdt. Agus Gunawan melanjutkan kepemimpinan sebagai Rektor. Pada tahun 2011, STTB hadir dengan wajah baru dengan dibangunnya gedung baru berlantai tujuh yang saat ini difungsikan untuk ruang-ruang kelas, kantor dosen dan staf, asrama mahasiswa, aula, dan perpustakaan. Buku ketiga dan keempat dari Seri Sola (Sola Gratia dan Solus Christos) diterbitkan. Pada periode ini juga beberapa orang di jajaran pimpinan melanjutkan studi doktoral di Asia dan Amerika. Tahun 2012 dibuka prodi baru S.Pd.K. (Sarjana Pendidikan Kristen) bersama dengan prodi M.Min. (Magister Ministri). Selanjutnya, pada tahun 2015, STTB juga menambah program studi M.Pd.K. (Magister Pendidikan Kristen), yang dirancang untuk memperlengkapi para pemimpin pendidikan Kristen. Dalam periode ini beberapa program studi sudah mulai terakreditasi oleh BAN-PT (Badan Akreditasi Nasional Perguruan Tinggi) dan ATA (Asian Theological Association). Selain itu juga STTB memperluas jejaring global yang ditandai dengan kehadiran beberapa orang dosen dari Inggris, India, dan Filipina, yang sangat mendukung program M.Th. yang diselenggarakan dalam Bahasa Inggris.
            </p>
          </div>
        </motion.div>

        {/* Item 5: 2017 - 2022 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute -left-[54px] top-1.5 h-6 w-6 bg-white border-[4px] border-[#092C74] z-10 box-content"></div>
          <div className="bg-[#F8F9FA] p-8 rounded-sm space-y-4">
            <h3 className="text-xl font-bold text-[#092C74] mb-3">2017 - 2022</h3>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              Periode ini diwarnai oleh pembenahan kualitas dan penajaman arah pengembangan program-program studi formal dan non-formal sesuai visi dan keunikan panggilan STTB. Formasi spiritualitas yg berkualitas dan terintegrasi antara kelas, kapel, kelompok pastoral, asrama, pemuridan, hingga mentoring dalam praktek pelayanan mengokohkan proses pembentukan untuk mahasiswa STh dan SPd untuk kesiapan mereka melayani. Komitmen STTB kepada dunia pendidikan kristen makin mendapat apresiasi luas melalui perkembangan program studi Magister Pendidikan, inisiasi tumbuhnya komunitas Indonesian Forum for Christian Educators (IFCE), dan kontribusi para dosen STTB dalam berbagai forum nasional. Demikian juga komitmen STTB untuk mengembangkan pendidikan teologi yang aplikatif dan transformatif mendapatkan sambutan yg positif melalui perkembangan program studi MTh yang berfokus pada Transformasi Budaya dan Masyarakat dan program studi MMin Marketplace untuk memperlengkapi profesional Kristen bermisi di dunia kerja. Sementara itu dua program MMin juga berlangsung dalam periode ini, yaitu MMin Music Leadership (bekerja sama dengan Singapore Bible College) dan MMin Pastoral Leadership.
            </p>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              Pendidikan nonformal makin berkembang dengan budaya digital yg tumbuh pesat selama masa pandemi. Melalui pengembangan pusat studi non-formal (LEAD Center) dikembangkan modul-modul pembinaan Vocatio (marketplace), Perspectives (misi), dan materi-materi pembinaan digital yg dapat diakses melalui media sosial. Pengembangan penelitian ditandai dengan publikasi ilmiah berupa seri webinar berkala Conversation That Matters (CTM) dan penerbitan monograf untuk tesis-tesis master yg terpilih karena kualitas dan relevansinya bagi pelayanan di lapangan. Mengingat besarnya dan luasnya pekerjaan yg harus dilakukan, maka kolaborasi dan sinergi dengan berbagai gereja dan lembaga secara nasional dan global yg sejalan dengan visi STTB makin dikembangkan dalam periode ini.
            </p>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              Dalam periode ini kepemimpinan STTB mengalami beberapa kali peralihan, yaitu Pdt Chandra Koewoso sebagai Ketua sejak Agustus 2017, dan selanjutnya Sutrisna Harjanto PhD sebagai Ketua sejak Agustus 2019 hingga saat ini.
            </p>
          </div>
        </motion.div>

        {/* Pendiri Section */}
        <div className="mt-20 pt-20 border-t border-gray-100">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-sm border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-10">
              <Users className="size-10 text-[#092C74]" />
              <h2 className="text-3xl font-bold text-[#092C74]">Para Pendiri STTB</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="relative mb-6 mx-auto w-full aspect-[4/5] overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <img src={images.imgCaleb} alt="Rev. DR. Caleb Tong" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
                    <p className="text-white font-bold text-lg leading-tight">Rev. DR. Caleb Tong (Alm.)</p>
                  </div>
                </div>
              </div>

              <div className="text-center group">
                <div className="relative mb-6 mx-auto w-full aspect-[4/5] overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <img src={images.imgJoseph} alt="Rev. DR. Joseph Tong, Ph.D." className="w-full h-full object-cover transition-all duration-500 scale-100 group-hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
                    <p className="text-white font-bold text-lg leading-tight">Rev. DR. Joseph Tong, Ph.D.</p>
                  </div>
                </div>
              </div>

              <div className="text-center group">
                <div className="relative mb-6 mx-auto w-full aspect-[4/5] overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <img src={images.imgDorothy} alt="Rev. Dorothy I. Marx" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
                    <p className="text-white font-bold text-lg leading-tight">Rev. Dorothy I. Marx (Alm.)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-[#F5F3FB] rounded-xl border-l-4 border-[#092C74]">
              <p className="text-gray-700 leading-relaxed italic text-lg text-center">
                "Mendirikan STTB pada tahun 1992 dengan tujuan menghasilkan Pastor-Scholar yang memiliki kerangka teologi Reformed Injili dalam konteks pekerjaan Tuhan di Indonesia."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
