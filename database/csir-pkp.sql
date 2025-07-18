/*
 Navicat Premium Dump SQL

 Source Server         : Localhost
 Source Server Type    : MariaDB
 Source Server Version : 100432 (10.4.32-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : csir-pkp

 Target Server Type    : MariaDB
 Target Server Version : 100432 (10.4.32-MariaDB)
 File Encoding         : 65001

 Date: 07/07/2025 15:13:33
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `author_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `articles_slug_unique`(`slug`) USING BTREE,
  INDEX `articles_author_id_foreign`(`author_id`) USING BTREE,
  CONSTRAINT `articles_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of articles
-- ----------------------------
INSERT INTO `articles` VALUES (1, 'Tantangan Keamanan Siber di Era Industri 4.0', 'tantangan-keamanan-siber-di-era-industri-40', '<p>Di era&nbsp;revolusi&nbsp;industri 4.0&nbsp;segala&nbsp;aspek kehidupan tidak&nbsp;terlepas dari sentuhan teknologi, mendorong transformasi digital pada aktivitas dan proses bisnis di berbagai sektor. &nbsp;Hal ini melahirkan beragam&nbsp;inovasi&nbsp;teknologi seperti&nbsp;<i>Artificial&nbsp;Intelligence</i>&nbsp;dan&nbsp;<i>Internet of&nbsp;Things&nbsp;</i>(IoT).&nbsp;Peranan teknologi&nbsp;IoT&nbsp;juga menghasilkan adanya&nbsp;C<i>loud&nbsp;Computing</i>&nbsp;dan&nbsp;<i>Big Data</i>.&nbsp;Melalui perkembangan teknologi informasi, saat ini setiap perangkat dengan mudah terkoneksi dalam jaringan komputer seperti internet.</p><p>Menurut World Bank, berdasarkan data ITU (<i>International Telecommunication Union</i>) porsi pengguna internet di dunia adalah sekitar 49 persen populasi pada tahun 2017, porsi tersebut meningkat pesat dibandingkan tahun 2000 yang hanya sekitar 6,7 persen.&nbsp;Serupa dengan hal tersebut, Internet World Stats memperkirakan porsi pengguna internet di dunia adalah sebesar 64,2 persen populasi pada kuartal pertama tahun 2021. Adapun jumlah pengguna internet yang diperkirakan itu adalah sebanyak lebih dari 5 miliar, jumlah tersebut meningkat sekitar 1.300 persen dibandingkan tahun 2000.</p><p>Peningkatan jumlah pengguna internet di dunia tidak terlepas dari peningkatan jumlah ancaman ataupun serangan siber (<i>cyber attack</i>). Khusus Indonesia, BSSN (Badan Siber dan Sandi Negara) mencatat pada tahun 2018 ada 12,8 juta serangan. Pada tahun 2019 melonjak 98,2 juta serangan, selanjutnya pada tahun 2020 ada sebanyak 74,2 juta serangan. (Laporan Honeynet Project, BSSN)</p><p>Ibarat kisah perisai yang tidak tertembus dan tombak yang mampu menembus apapun,&nbsp;serangan siber (<i>cyber attack</i>)&nbsp;terus menciptakan ancaman potensial bagi sistem sampai&nbsp;<i>end-user</i>.&nbsp;Pada tahun 2021 ini,&nbsp;sejumlah pihak menilai serangan siber belum akan mereda.&nbsp;Kaspersky misalnya menyebutkan bahwa pandemi COVID-19 bisa membuat munculnya berbagai gelombang kemiskinan yang kemungkinan&nbsp; akan meningkatkan kejahatan, termasuk melakukan&nbsp;<i>cyber attack</i>.&nbsp;Salah satu solusi untuk meminimalisir&nbsp;hal&nbsp;tersebut&nbsp;yaitu&nbsp;dengan&nbsp;&nbsp;memberi perhatian terhadap&nbsp;pengelolaan sistem&nbsp;keamanan siber (<i>cybersecurity</i>).&nbsp;<i>Cybersecurity</i>&nbsp;merupakan perlindungan yang sangat dibutuhkan baik untuk perorangan, perusahaan, ataupun pemerintahan untuk menjaga dan mencegah penyalahgunaan akses maupun pemanfaatan data dalam sistem teknologi informasi dari seseorang yang tidak memiliki hak untuk mengakses maupun memanfaatkan data dalam sistem tersebut.</p><p><strong>Apa itu&nbsp;</strong><i><strong>Cybersecurity</strong></i><strong>?</strong></p><p>Menurut ISO (International Organization for Standardization), tepatnya&nbsp;<strong>ISO/IEC 27032:2012</strong>&nbsp;<i>Information technology — Security techniques — Guidelines for cybersecurity</i>.&nbsp;<i>Cybersecurity&nbsp;</i>atau&nbsp;<i>cyberspace security</i>&nbsp;adalah&nbsp;upaya yang dilakukan dalam menjaga&nbsp;kerahasiaan&nbsp;(<i>confidentiality</i>), integritas&nbsp;(<i>integrity</i>), dan ketersediaan&nbsp;(<i>availability</i>)&nbsp;dari&nbsp;informasi di&nbsp;<i>cyberspace&nbsp;</i>. Adapun&nbsp;<i>cyberspace&nbsp;</i>merujuk pada lingkungan yang kompleks yang merupakan hasil dari interaksi antara orang,&nbsp;perangkat&nbsp;lunak, dan layanan&nbsp;di&nbsp;internet,&nbsp;&nbsp;yang didukung oleh&nbsp;perangkat teknologi informasi dan komunikasi (TIK)&nbsp;dan&nbsp;koneksi jaringan&nbsp;yang tersebar di seluruh dunia.</p><p>Sedangkan menurut&nbsp;<strong>CISCO</strong>,&nbsp;<i>cybersecurity&nbsp;</i>adalah praktik melindungi sistem, jaringan, dan program dari serangan digital.&nbsp;<i>Cybersecurity</i>&nbsp;biasanya ditujukan untuk mengakses, mengubah, atau menghancurkan informasi sensitif, memeras uang dari pengguna, atau mengganggu operasional proses bisnis.</p><p>Jadi, dapat disimpulkan bahwa&nbsp;<i>cybersecurity</i>&nbsp;atau keamanan siber sebagai tindakan untuk melindungi sistem komputer dari serangan digital atau akses ilegal. Terdapat beberapa elemen dari&nbsp;<i>cybersecurity</i>&nbsp;antara lain,&nbsp;<i>application security, information security, cloud security, network security, disaster recovery/business continuity planning, operational security,&nbsp;</i>dan&nbsp;<i>end-user education</i>. Elemen-elemen ini sangat penting&nbsp; guna memastikan keamanan&nbsp;<i>cybersecurity</i>&nbsp;secara keseluruhan, karena risiko terkena ancaman digital terus meningkat dan ancamannya pun semakin beragam. &nbsp;Maka dari itu, penting untuk melindungi sistem bahkan dari risiko terkecil sekalipun.</p><p><strong>Ancaman&nbsp;</strong><i><strong>Cybersecurity</strong></i></p><p>&nbsp;</p><p>Ancaman maupun serangan tidak hanya terjadi di dunia nyata atau langsung menyentuh diri kita tetapi juga marak terjadi saling menyerang di&nbsp;<i>cyberspace</i>.&nbsp;Penyerangan di cyberspace paling dikenal yang melahirkan istilah&nbsp;<i>cyber attack</i>&nbsp;terjadi pada tahun 1988 dalam peristiwa&nbsp;<i>The Morris Worm</i>. Pada saat itu, seorang mahasiswa pascasarjana Cornell University New York, Amerika. Robert Tapan Morris berhasil menyebarkan virus (<i>Morris Worm</i>) pada sebagian besar komputer di Amerika Serikat dan mematikan sekitar 10 persen komputer di dunia yang pada saat itu sedang terhubung ke internet. Pelaku&nbsp;<i>cyber attack</i>&nbsp;pada dasarnya adalah orang yang menguasai algoritma dan pemrograman komputer untuk menciptakan kode/<i>script</i>. Mereka mampu menganalisa celah pada sistem sehingga memanfaatkan celah tersebut untuk memasuki sistem komputer secara illegal dan melakukan pengrusakan data. Ada pun jenis ancaman siber berdasarkan modus operasi pelaksanaannya, yaitu:</p><p><strong>1.&nbsp;&nbsp;&nbsp; </strong><i><strong>Cyber Crime</strong></i></p><p>Berawal&nbsp; di&nbsp; periode&nbsp; 1960-an&nbsp; dan&nbsp; terus&nbsp; berkembang&nbsp; hingga saat ini. Terjadi&nbsp; pertama&nbsp; kali&nbsp; di&nbsp; Amerika&nbsp; Serikat&nbsp; pada&nbsp; tahun&nbsp; 1960-an. Berbagai kasus&nbsp;<i>cyber</i>&nbsp;<i>crime</i>&nbsp;terjadi saat itu, mulai dari manipulasi transkrip akademik mahasiswa di Brooklyn College New York, penggunaan komputer dalam penyelundupan narkotika, penyalahgunaan&nbsp; komputer oleh karyawan hingga akses tidak sah terhadap Database Security Pacific National Bank yang&nbsp; mengakibatkan kerugian sebesar 10.2 juta dolar AS pada tahun 1978. Dalam praktik&nbsp;<i>cyber&nbsp;</i>crime, pelaku melakukan akses ilegal seperti transmisi ilegal atau manipulasi data untuk tujuan tertentu, di antaranya menciptakan gangguan dan mencari keuntungan finansial, bisa dilakukan seorang diri atau melibatkan sekelompok orang. Para pelaku cyber crime tentu adalah orang yang sudah ahli dalam berbagai teknik&nbsp;<i>hacking</i>, bahkan tak jarang sebuah aksi&nbsp;<i>cyber crime</i>&nbsp;dilakukan dari berbagai tempat berbeda di waktu bersamaan. Banyak contoh aksi&nbsp;<i>cyber crime</i>&nbsp;yang masih terjadi, seperti pencurian identitas (<i>identity theft</i>), penipuan/pembobolan kartu kredit (<i>carding</i>), memata-matai target tertentu (<i>cyber espionage</i>), dan lain-lain.</p><p><strong>2.&nbsp;&nbsp;&nbsp; </strong><i><strong>Cyber Warfare</strong></i></p><p>Perkembangan teknologi informasi dan komunikasi memberi banyak kemudahan dalam menjalankan aktivitas pemerintahan, namun melahirkan ancaman baru yang berdampak bagi kestabilan kedaulatan suatu negara juga, yaitu&nbsp; <i>cyber warfare</i>.&nbsp; <i>Cyber warfare</i>&nbsp;merupakan perkembangan dari&nbsp;<i>cyber attack</i>&nbsp;dan&nbsp;<i>cyber crime</i>.&nbsp;<i>Cyber warfare</i>&nbsp;dapat diartikan sebagai perang di dalam&nbsp;<i>cyberspace</i>, namun di dalam cyber warfare terdapat penyerangan yang berbeda dengan penyerangan dalam perang konvensional atau perang fisik lainnya. Media utama yang digunakan di dalam cyber warfare adalah komputer dan internet, objek yang diserang dalam&nbsp;<i>cyber warfare</i>&nbsp;bukan&nbsp; merupakan&nbsp; wilayah fisik, wilayah teritorial ataupun wilayah geografis, namun objek dalam&nbsp;<i>cyberspace</i>&nbsp;yang dikuasai oleh suatu negara. Salah satu contoh kasus&nbsp;<i>cyber warfare</i>&nbsp;yaitu kasus antara Amerika Serikat dengan Iran di tahun 2008 dimana Amerika Serikat merusak&nbsp; sistem&nbsp; sentrifugal&nbsp; Pembangkit&nbsp; Listrik&nbsp; Tenaga&nbsp; Nuklir&nbsp; milik&nbsp; Iran.</p><p><strong>3.&nbsp;&nbsp;&nbsp; </strong><i><strong>Cyber Terrorism</strong></i></p><p>Merupakan aktivitas sejumlah jaringan atau kelompok teroris yang bertujuan untuk mengganggu keamanan sosial, politik, dan ekonomi suatu negara dengan memanfaatkan kekuatan teknologi internet. Misalnya seperti menyerang website resmi pemerintah, melakukan sadap jaringan komunikasi strategis politik, mencuri sumber data elektronik perbankan, dan sebagainya. Aktivitas siber ini sangat berbahaya karena dapat&nbsp;menyebabkan kepanikan dan ketakutan skala besar.</p><p><br>&nbsp;</p><p><strong>Metode&nbsp;</strong><i><strong>Cyber Attack</strong></i></p><p><br>&nbsp;</p><p>Beberapa metode yang umum digunakan oleh pelaku&nbsp;<i>cyber attack</i>&nbsp;yang menjadi ancaman&nbsp;<i>cybersecurity</i>.</p><p><strong>1.&nbsp;&nbsp;&nbsp; </strong><i><strong>Malware (Malicious Software)</strong></i></p><p><i>Malware</i>&nbsp;adalah salah satu ancaman cyber paling umum, berbentuk software berbahaya yang dibuat untuk menganggu atau merusak komputer pengguna.&nbsp;<i>Malware</i>&nbsp;seringkali menyebar melalui lampiran email atau unduhan yang nampak sah, beberapa jenis&nbsp;<i>malware</i>&nbsp;yang&nbsp;umum dikenal&nbsp;yaitu:</p><p>·&nbsp;&nbsp;&nbsp;&nbsp; <strong>Virus</strong>: Program yang mereplikasi diri, menempel pada file bersih dan menyebar ke seluruh sistem komputer. Virus menginfeksi file dengan kode berbahaya.</p><p>·&nbsp;&nbsp;&nbsp;&nbsp; <strong>Trojans</strong>: Sejenis malware yang menyamar sebagai perangkat lunak yang sah. Penjahat cyber menipu pengguna agar mengunggah Trojan ke komputer mereka untuk mengumpulkan data atau menyebabkan kerusakan.</p><p>·&nbsp; &nbsp;<strong>Spyware</strong>: Program ini secara diam-diam merekam apa yang dilakukan pengguna, sehingga penjahat dunia maya dapat menggunakan informasi ini. Misalnya spyware digunakan untuk menangkap detail kartu kredit.</p><p>·&nbsp;&nbsp;&nbsp;&nbsp; <strong>Ransomware</strong>: Malware yang mengunci file dan data pengguna, dengan ancaman akan&nbsp;mempublikasikan, menghapus, atau menahan akses pengguna ke data pribadi yang penting&nbsp;kecuali pemilik data membayar tebusan.</p><p>·&nbsp;&nbsp;&nbsp;&nbsp; <strong>Adware</strong>: Perangkat lunak periklanan yang dapat digunakan untuk menyebarkan malware.</p><p>·&nbsp; &nbsp;<i><strong>Botnet</strong>:&nbsp;</i>Menurut John Tay dan Jeffrey Tosco pada presentasinya di&nbsp;<i>APNIC Training&nbsp;</i>menyatakan bahwa&nbsp;<i>bot&nbsp;</i>merupakan software yang bekerja secara otomatis (seperti robot) dalam menyebarkan dirinya ke sebuah&nbsp;<i>host</i>&nbsp;secara diam-diam dan menunggu perintah dari&nbsp;<i>botmaster</i>.&nbsp;<i>Botnet&nbsp;</i>sudah menjadi suatu bagian penting dari keamanan jaringan internet, karena sifatnya yang tersembunyi pada jaringan&nbsp;<i>server&nbsp;</i>internet.</p><p><strong>2.&nbsp;&nbsp;&nbsp; </strong><i><strong>Social engineering</strong></i></p><p><i>Social engineering</i>&nbsp;adalah istilah yang digunakan untuk menggambarkan serangan yang didasarkan oleh interaksi manusia,&nbsp;dilakukan dengan&nbsp;memanipulasi pengguna untuk memberikan informasi sensitif seperti&nbsp;<i>password,&nbsp;</i>jawaban untuk pertanyaan keamanan, dan lainnya. Jenis ancaman ini memanfaatkan rasa ingin tahu manusia dan memancingnya untuk melakukan hal-hal yang mungkin terasa biasa saja, tetapi sebenarnya membahayakan.&nbsp;Sebagai contoh, aksi&nbsp;<i>social engineering</i>&nbsp;yang marak menimpa pengguna ojek online. Modus yang dijalankan adalah dengan menelpon korban dan menanyakan kode OTP (<i>One Time Password</i>), kode ini cukup penting untuk dapat mengambil alih akun korban.</p><p><strong>3.&nbsp;&nbsp;&nbsp; Injeksi SQL</strong></p><p>Injeksi SQL (<i>Structured Query Language</i>) adalah jenis ancaman&nbsp;<i>cybersecurity</i>&nbsp;yang digunakan untuk mengambil kendali dan mencuri data dari pusat data. Penjahat siber memanfaatkan kerentanan dalam aplikasi berbasis data untuk memasukkan kode berbahaya ke dalam basis data melalui pernyataan SQL. Ini memberi mereka akses ke informasi sensitif yang terdapat dalam pusat data.</p><p><strong>4.&nbsp;&nbsp;&nbsp; </strong><i><strong>E-mail Spam</strong></i><strong>&nbsp;dan&nbsp;</strong><i><strong>Phishing</strong></i></p><p><i>Phishing</i>&nbsp;merupakan bentuk penipuan yang biasanya hadir melalui email, penipu akan mengirimkan email menggunakan alamat yang mirip dengan sumber terpercaya dan mengelabui target menggunakan&nbsp;<i>fake form login</i>&nbsp;pada situs palsu yang menyerupai situs aslinya. Penipuan ini bertujuan untuk mencuri data sensitif seperti nomor keamanan kartu kredit (CVC),&nbsp;<i>password</i>, dan informasi penting lainnya.</p><p><strong>5.&nbsp;&nbsp;&nbsp; Ancaman&nbsp;</strong><i><strong>Domain Name</strong></i></p><p><i>Domain name</i>&nbsp;adalah aset yang berharga karena dapat diperjualbelikan, disewa, dapat menjadi situs pemasang iklan sehingga menjadi sumber keuangan, bahkan dapat dijaminkan. Ada beberapa jenis ancaman&nbsp;<i>cybersecurity</i>&nbsp;yang berhubungan dengan nama domain, yaitu:</p><p>·&nbsp;&nbsp;&nbsp;&nbsp; <i><strong>Cybersquatting</strong></i>:&nbsp;Penyerobotan nama domain atau&nbsp;<i>cybersquatting</i>&nbsp;yaitu tindakan pendaftaran&nbsp;nama domain&nbsp;yang dilakukan oleh orang yang tidak berhak atau tidak memiliki&nbsp;<i>legitimate interest</i>.&nbsp;Kejahatan cyber ini mengacu pada&nbsp;praktik&nbsp;membeli nama domain dari brand-brand besar dengan maksud untuk mengeruk keuntungan.&nbsp;<i>Cybersquatting</i>&nbsp;mendapat perhatian dari perusahaan-perusahaan besar khususnya di Indonesia, terutama karena dapat berimbas pada rusaknya citra mereka. Berdasarkan Laporan&nbsp;<i>Palo Alto Networks&nbsp;</i>per September 2020 menyatakan sebanyak 13.857&nbsp;<i>squatting&nbsp;</i>domain yang telah teregistrasi selama bulan Desember 2019, angka tersebut sama dengan rata-rata 450&nbsp;<i>squatting&nbsp;</i>domain teregistrasi setiap harinya.&nbsp;<i>Palo Alto Networks</i>&nbsp;kemudian menemukan 2.595 (18,59 persen) nama-nama&nbsp;<i>squatting</i>&nbsp;domain yang berbahaya yang kerap mendistribusikan&nbsp;<i>malware</i>&nbsp;atau menyebarkan serangan&nbsp;<i>phishing.</i>&nbsp;Kemudian, sebanyak 5.104 (36,57 persen)&nbsp;<i>squatting</i>&nbsp;domain menghadirkan resiko tinggi bagi pengguna yang mengunjunginya.</p><p>·&nbsp;&nbsp;&nbsp;&nbsp; <i><strong>Typosquatting</strong></i>:&nbsp;Kejahatan dengan membuat domain plesetan yang dibuat dari asumsi salah ketik&nbsp;(<i>typo</i>).&nbsp;Contoh google.com menjadi goggle.com atau gogle.com. Pelaku kejahatan&nbsp;<i>typosquatting</i>&nbsp;akan mendaftarkan satu atau lebih nama domain salah ketik dari merek tertentu,&nbsp; kemudian ketika&nbsp;pengguna&nbsp;secara tidak sengaja mengetikkan alamat situs yang salah, maka akan diarahkan ke situs alternatif palsu (biasanya mengandung malware dan/atau konten-konten asusila).</p><p><strong>6.&nbsp;&nbsp;&nbsp; DoS</strong><i><strong>&nbsp;(Denial of Service)</strong></i></p><p>Metode<i>&nbsp;cyber&nbsp;</i>crime ini mencegah sistem komputer memenuhi permintaan akses yang, sehingga&nbsp;pengguna&nbsp;yang berhak atau yang berkepentingan tidak dapat menggunakan layanan tersebut. Serangan DoS menargetkan bandwidth dan koneksi sebuah jaringan untuk dapat mencapai misinya,&nbsp;dengan membanjiri jaringan dan server dengan&nbsp;<i>traffic&nbsp;</i>menggunakan perangkat yang sudah tersedia pada jaringan itu sendiri,&nbsp;sehingga membuat&nbsp;pengguna&nbsp;yang sudah terkoneksi di dalamnya mengalami hilang koneksi.</p><p>&nbsp;</p><p>Setiap tindak kejahatan di&nbsp;<i>cyberspace</i>&nbsp;tentu saja mengakibatkan kerugian yang dirasakan oleh korbannya, kerugian yang dihasilkan cyber attack pun sangat besar. Sebagai contoh,&nbsp;<i>WannaCry</i>&nbsp;yang sempat menghebohkan dunia beberapa tahun lalu. Menurut Kaspersky,&nbsp;<i>WannaCry</i>&nbsp;yang menginfeksi lebih dari 230.000 perangkat di 150 negara mengakibatkan kerugian setidaknya 4 miliar dolar AS secara global.</p><p>&nbsp;</p><p>Spesifik di Indonesia, berdasarkan penelitian Frost &amp; Sullivan yang diprakarsai Microsoft pada tahun 2018, potensi kerugian ekonomi di Indonesia yang diakibatkan oleh&nbsp;<i>cyber attack</i>&nbsp;menyebabkan kerugian mencapai Rp 478,8 triliun atau 34,2 miliar dolar AS. Besarnya nilai kerugian tersebut adalah lebih dari 3 persen PDB Indonesia pada tahun 2018.</p><p>&nbsp;</p><p>Menerapkan&nbsp;<i>cybersecurity</i>&nbsp;yang efektif kini menjadi tantangan, karena ada begitu banyak perangkat dibandingkan pengguna, dan penyerangan pun menjadi lebih inovatif.&nbsp;Walaupun infrastruktur pendukung keamanan siber telah diperkuat dewasa ini, tetapi tidak menutup kemungkinan peningkatan ancaman keamanan siber secara eksponensial. Melihat urgensi dari&nbsp;<i>cybersecurity</i>&nbsp;maka perlu upaya serius dari&nbsp;organisasi&nbsp;untuk membangun suatu infrastruktur pengamanan data dan infomasi yang handal, personil yang berkompeten, serta menyusun suatu prosedur operasional yang baku dalam pengelolaan data dan informasi dengan mengacu pada&nbsp;standar&nbsp;<i>cybersecurity</i>.</p><p>Salah satu standar&nbsp;<i>cybersecurity</i><strong>&nbsp;</strong>yang paling populer<strong>&nbsp;</strong>adalah<strong>&nbsp;ISO/IEC 270001:213</strong>&nbsp;<i>Information technology — Security techniques — Information security management systems — Requirements.</i>&nbsp;Pertama kali diterbitkan pada tahun 2005 dan telah mengalami pembaruan beberapa kali,&nbsp;dirancang untuk meningkatkan keamanan informasi, praktek keamanan informasi yang baik, dan kebijakan terkait untuk membantu mencegah penyalahgunaan dan pengubahan informasi dan komputasi sistem yang sensitif. Sertifikasi&nbsp;<strong>ISO/IEC 27001</strong>&nbsp;pun bisa membantu organisasi mendapatkan kepercayaan yang lebih baik dari konsumennya.</p>', 1, '2025-07-03 07:32:10', '2025-07-03 07:42:31');

-- ----------------------------
-- Table structure for cache
-- ----------------------------
DROP TABLE IF EXISTS `cache`;
CREATE TABLE `cache`  (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cache
-- ----------------------------
INSERT INTO `cache` VALUES ('laravel_cache_spatie.permission.cache', 'a:3:{s:5:\"alias\";a:4:{s:1:\"a\";s:2:\"id\";s:1:\"b\";s:4:\"name\";s:1:\"c\";s:10:\"guard_name\";s:1:\"r\";s:5:\"roles\";}s:11:\"permissions\";a:27:{i:0;a:4:{s:1:\"a\";i:1;s:1:\"b\";s:11:\"users index\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:1;a:4:{s:1:\"a\";i:2;s:1:\"b\";s:12:\"users create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:2;a:4:{s:1:\"a\";i:3;s:1:\"b\";s:10:\"users edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:3;a:4:{s:1:\"a\";i:4;s:1:\"b\";s:12:\"users delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:4;a:4:{s:1:\"a\";i:5;s:1:\"b\";s:11:\"roles index\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:5;a:4:{s:1:\"a\";i:6;s:1:\"b\";s:12:\"roles create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:6;a:4:{s:1:\"a\";i:7;s:1:\"b\";s:10:\"roles edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:7;a:4:{s:1:\"a\";i:8;s:1:\"b\";s:12:\"roles delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:8;a:4:{s:1:\"a\";i:9;s:1:\"b\";s:17:\"permissions index\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:9;a:4:{s:1:\"a\";i:10;s:1:\"b\";s:18:\"permissions create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:10;a:4:{s:1:\"a\";i:11;s:1:\"b\";s:16:\"permissions edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:11;a:4:{s:1:\"a\";i:12;s:1:\"b\";s:18:\"permissions delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:12;a:4:{s:1:\"a\";i:13;s:1:\"b\";s:14:\"articles index\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:13;a:4:{s:1:\"a\";i:14;s:1:\"b\";s:15:\"articles create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:14;a:4:{s:1:\"a\";i:15;s:1:\"b\";s:13:\"articles edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:15;a:4:{s:1:\"a\";i:16;s:1:\"b\";s:15:\"articles delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:16;a:4:{s:1:\"a\";i:17;s:1:\"b\";s:13:\"sliders index\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:17;a:4:{s:1:\"a\";i:18;s:1:\"b\";s:14:\"sliders create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:18;a:4:{s:1:\"a\";i:19;s:1:\"b\";s:12:\"sliders edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:19;a:4:{s:1:\"a\";i:20;s:1:\"b\";s:14:\"sliders delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:20;a:4:{s:1:\"a\";i:21;s:1:\"b\";s:15:\"incidents index\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:21;a:4:{s:1:\"a\";i:22;s:1:\"b\";s:14:\"incidents show\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:22;a:4:{s:1:\"a\";i:23;s:1:\"b\";s:16:\"incidents delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:23;a:4:{s:1:\"a\";i:24;s:1:\"b\";s:12:\"guides index\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:24;a:4:{s:1:\"a\";i:25;s:1:\"b\";s:13:\"guides create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:25;a:4:{s:1:\"a\";i:26;s:1:\"b\";s:11:\"guides edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:26;a:4:{s:1:\"a\";i:27;s:1:\"b\";s:13:\"guides delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}}s:5:\"roles\";a:1:{i:0;a:3:{s:1:\"a\";i:1;s:1:\"b\";s:5:\"admin\";s:1:\"c\";s:3:\"web\";}}}', 1751704440);

-- ----------------------------
-- Table structure for cache_locks
-- ----------------------------
DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE `cache_locks`  (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cache_locks
-- ----------------------------

-- ----------------------------
-- Table structure for failed_jobs
-- ----------------------------
DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `failed_jobs_uuid_unique`(`uuid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of failed_jobs
-- ----------------------------

-- ----------------------------
-- Table structure for guides
-- ----------------------------
DROP TABLE IF EXISTS `guides`;
CREATE TABLE `guides`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `file_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `author_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `guides_author_id_foreign`(`author_id`) USING BTREE,
  CONSTRAINT `guides_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of guides
-- ----------------------------
INSERT INTO `guides` VALUES (2, 'Contoh Panduan', 'Ini hanya sebuah contoh dari panduan penangan insiden siber', 'guides/A75WZR9LEPfvGKGUlmtyCOjAUciN8jCD1e2racyN.pdf', 1, 1, '2025-07-04 08:28:21', '2025-07-04 08:28:21');

-- ----------------------------
-- Table structure for incident_responses
-- ----------------------------
DROP TABLE IF EXISTS `incident_responses`;
CREATE TABLE `incident_responses`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `incident_id` bigint(20) UNSIGNED NOT NULL,
  `responder_id` bigint(20) UNSIGNED NOT NULL,
  `response` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `new_status` enum('open','in_progress','resolved') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `incident_responses_incident_id_foreign`(`incident_id`) USING BTREE,
  INDEX `incident_responses_responder_id_foreign`(`responder_id`) USING BTREE,
  CONSTRAINT `incident_responses_incident_id_foreign` FOREIGN KEY (`incident_id`) REFERENCES `incidents` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `incident_responses_responder_id_foreign` FOREIGN KEY (`responder_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of incident_responses
-- ----------------------------
INSERT INTO `incident_responses` VALUES (4, 4, 1, 'Akan kami tindak lanjuti laporan saudara', NULL, '2025-07-04 08:59:52', '2025-07-04 08:59:52');
INSERT INTO `incident_responses` VALUES (5, 4, 1, 'Saat ini sedang kami lakukan penangan tersebut', NULL, '2025-07-04 09:00:45', '2025-07-04 09:00:45');

-- ----------------------------
-- Table structure for incidents
-- ----------------------------
DROP TABLE IF EXISTS `incidents`;
CREATE TABLE `incidents`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `ticket_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `reporter_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `reporter_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('open','in_progress','resolved') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'open',
  `attachment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `incidents_ticket_number_unique`(`ticket_number`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of incidents
-- ----------------------------
INSERT INTO `incidents` VALUES (4, 'RH0XCT7OLA', NULL, NULL, 'Ada Lapooran lain', 'ini', 'in_progress', 'incident_attachments/MAjyW2Z6v2fqW192Pei49qkZSWW3ux0NEGK9JOM3.png', '2025-07-04 08:53:53', '2025-07-04 08:59:52');

-- ----------------------------
-- Table structure for job_batches
-- ----------------------------
DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE `job_batches`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `cancelled_at` int(11) NULL DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of job_batches
-- ----------------------------

-- ----------------------------
-- Table structure for jobs
-- ----------------------------
DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED NULL DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `jobs_queue_index`(`queue`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of jobs
-- ----------------------------

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO `migrations` VALUES (1, '0001_01_01_000000_create_users_table', 1);
INSERT INTO `migrations` VALUES (2, '0001_01_01_000001_create_cache_table', 1);
INSERT INTO `migrations` VALUES (3, '0001_01_01_000002_create_jobs_table', 1);
INSERT INTO `migrations` VALUES (4, '2025_07_03_040522_create_permission_tables', 2);
INSERT INTO `migrations` VALUES (5, '2025_07_03_064738_create_articles_table', 3);
INSERT INTO `migrations` VALUES (6, '2025_07_03_074809_create_sliders_table', 4);
INSERT INTO `migrations` VALUES (7, '2025_07_03_091558_create_incidents_table', 5);
INSERT INTO `migrations` VALUES (8, '2025_07_03_091713_create_incident_responses_table', 5);
INSERT INTO `migrations` VALUES (9, '2025_07_03_095552_create_guides_table', 6);
INSERT INTO `migrations` VALUES (10, '2025_07_04_070854_add_attachment_to_incidents_table', 7);
INSERT INTO `migrations` VALUES (11, '2025_07_04_071619_add_status_to_incident_responses_table', 8);

-- ----------------------------
-- Table structure for model_has_permissions
-- ----------------------------
DROP TABLE IF EXISTS `model_has_permissions`;
CREATE TABLE `model_has_permissions`  (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL,
  PRIMARY KEY (`permission_id`, `model_id`, `model_type`) USING BTREE,
  INDEX `model_has_permissions_model_id_model_type_index`(`model_id`, `model_type`) USING BTREE,
  CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of model_has_permissions
-- ----------------------------

-- ----------------------------
-- Table structure for model_has_roles
-- ----------------------------
DROP TABLE IF EXISTS `model_has_roles`;
CREATE TABLE `model_has_roles`  (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL,
  PRIMARY KEY (`role_id`, `model_id`, `model_type`) USING BTREE,
  INDEX `model_has_roles_model_id_model_type_index`(`model_id`, `model_type`) USING BTREE,
  CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of model_has_roles
-- ----------------------------
INSERT INTO `model_has_roles` VALUES (1, 'App\\Models\\User', 1);

-- ----------------------------
-- Table structure for password_reset_tokens
-- ----------------------------
DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE `password_reset_tokens`  (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of password_reset_tokens
-- ----------------------------

-- ----------------------------
-- Table structure for permissions
-- ----------------------------
DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `permissions_name_guard_name_unique`(`name`, `guard_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of permissions
-- ----------------------------
INSERT INTO `permissions` VALUES (1, 'users index', 'web', '2025-07-03 04:20:11', '2025-07-03 04:20:11');
INSERT INTO `permissions` VALUES (2, 'users create', 'web', '2025-07-03 04:20:11', '2025-07-03 04:20:11');
INSERT INTO `permissions` VALUES (3, 'users edit', 'web', '2025-07-03 04:20:11', '2025-07-03 04:20:11');
INSERT INTO `permissions` VALUES (4, 'users delete', 'web', '2025-07-03 04:20:12', '2025-07-03 04:20:12');
INSERT INTO `permissions` VALUES (5, 'roles index', 'web', '2025-07-03 04:20:12', '2025-07-03 04:20:12');
INSERT INTO `permissions` VALUES (6, 'roles create', 'web', '2025-07-03 04:20:12', '2025-07-03 04:20:12');
INSERT INTO `permissions` VALUES (7, 'roles edit', 'web', '2025-07-03 04:20:12', '2025-07-03 04:20:12');
INSERT INTO `permissions` VALUES (8, 'roles delete', 'web', '2025-07-03 04:20:12', '2025-07-03 04:20:12');
INSERT INTO `permissions` VALUES (9, 'permissions index', 'web', '2025-07-03 04:20:12', '2025-07-03 04:20:12');
INSERT INTO `permissions` VALUES (10, 'permissions create', 'web', '2025-07-03 04:20:13', '2025-07-03 04:20:13');
INSERT INTO `permissions` VALUES (11, 'permissions edit', 'web', '2025-07-03 04:20:13', '2025-07-03 04:20:13');
INSERT INTO `permissions` VALUES (12, 'permissions delete', 'web', '2025-07-03 04:20:13', '2025-07-03 04:20:13');
INSERT INTO `permissions` VALUES (13, 'articles index', 'web', '2025-07-03 06:58:49', '2025-07-03 06:58:49');
INSERT INTO `permissions` VALUES (14, 'articles create', 'web', '2025-07-03 06:59:02', '2025-07-03 06:59:02');
INSERT INTO `permissions` VALUES (15, 'articles edit', 'web', '2025-07-03 06:59:12', '2025-07-03 06:59:12');
INSERT INTO `permissions` VALUES (16, 'articles delete', 'web', '2025-07-03 06:59:41', '2025-07-03 06:59:41');
INSERT INTO `permissions` VALUES (17, 'sliders index', 'web', '2025-07-03 08:36:17', '2025-07-03 08:36:17');
INSERT INTO `permissions` VALUES (18, 'sliders create', 'web', '2025-07-03 08:36:30', '2025-07-03 08:36:30');
INSERT INTO `permissions` VALUES (19, 'sliders edit', 'web', '2025-07-03 08:36:43', '2025-07-03 08:36:43');
INSERT INTO `permissions` VALUES (20, 'sliders delete', 'web', '2025-07-03 08:36:55', '2025-07-03 08:36:55');
INSERT INTO `permissions` VALUES (21, 'incidents index', 'web', '2025-07-03 09:33:04', '2025-07-03 09:33:37');
INSERT INTO `permissions` VALUES (22, 'incidents show', 'web', '2025-07-03 09:33:19', '2025-07-03 09:33:46');
INSERT INTO `permissions` VALUES (23, 'incidents delete', 'web', '2025-07-03 09:34:04', '2025-07-03 09:34:04');
INSERT INTO `permissions` VALUES (24, 'guides index', 'web', '2025-07-03 10:05:40', '2025-07-03 10:05:40');
INSERT INTO `permissions` VALUES (25, 'guides create', 'web', '2025-07-03 10:05:54', '2025-07-03 10:05:54');
INSERT INTO `permissions` VALUES (26, 'guides edit', 'web', '2025-07-03 10:06:10', '2025-07-04 08:33:59');
INSERT INTO `permissions` VALUES (27, 'guides delete', 'web', '2025-07-03 10:06:22', '2025-07-03 10:06:52');

-- ----------------------------
-- Table structure for role_has_permissions
-- ----------------------------
DROP TABLE IF EXISTS `role_has_permissions`;
CREATE TABLE `role_has_permissions`  (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL,
  PRIMARY KEY (`permission_id`, `role_id`) USING BTREE,
  INDEX `role_has_permissions_role_id_foreign`(`role_id`) USING BTREE,
  CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_has_permissions
-- ----------------------------
INSERT INTO `role_has_permissions` VALUES (1, 1);
INSERT INTO `role_has_permissions` VALUES (2, 1);
INSERT INTO `role_has_permissions` VALUES (3, 1);
INSERT INTO `role_has_permissions` VALUES (4, 1);
INSERT INTO `role_has_permissions` VALUES (5, 1);
INSERT INTO `role_has_permissions` VALUES (6, 1);
INSERT INTO `role_has_permissions` VALUES (7, 1);
INSERT INTO `role_has_permissions` VALUES (8, 1);
INSERT INTO `role_has_permissions` VALUES (9, 1);
INSERT INTO `role_has_permissions` VALUES (10, 1);
INSERT INTO `role_has_permissions` VALUES (11, 1);
INSERT INTO `role_has_permissions` VALUES (12, 1);
INSERT INTO `role_has_permissions` VALUES (13, 1);
INSERT INTO `role_has_permissions` VALUES (14, 1);
INSERT INTO `role_has_permissions` VALUES (15, 1);
INSERT INTO `role_has_permissions` VALUES (16, 1);
INSERT INTO `role_has_permissions` VALUES (17, 1);
INSERT INTO `role_has_permissions` VALUES (18, 1);
INSERT INTO `role_has_permissions` VALUES (19, 1);
INSERT INTO `role_has_permissions` VALUES (20, 1);
INSERT INTO `role_has_permissions` VALUES (21, 1);
INSERT INTO `role_has_permissions` VALUES (22, 1);
INSERT INTO `role_has_permissions` VALUES (23, 1);
INSERT INTO `role_has_permissions` VALUES (24, 1);
INSERT INTO `role_has_permissions` VALUES (25, 1);
INSERT INTO `role_has_permissions` VALUES (26, 1);
INSERT INTO `role_has_permissions` VALUES (27, 1);

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `roles_name_guard_name_unique`(`name`, `guard_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, 'admin', 'web', '2025-07-03 04:18:00', '2025-07-03 04:18:00');
INSERT INTO `roles` VALUES (2, 'user', 'web', '2025-07-03 04:18:00', '2025-07-03 04:18:00');

-- ----------------------------
-- Table structure for sessions
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED NULL DEFAULT NULL,
  `ip_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `user_agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `sessions_user_id_index`(`user_id`) USING BTREE,
  INDEX `sessions_last_activity_index`(`last_activity`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sessions
-- ----------------------------
INSERT INTO `sessions` VALUES ('7PyCfODKGFIaXsdQzNL1hO2IjYT85Na4m2fr9PLQ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoibGsyVTJEMFFrVnhaWGlGMFVNZHlMVlJpYVNNdVZJcnZPRUtkMm5FRSI7czoxNDoiY2FwdGNoYV9yZXN1bHQiO2k6OTtzOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czozNToiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2xhcG9yLWluc2lkZW4iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1751623152);
INSERT INTO `sessions` VALUES ('gnQNCsYC9mHWLCGtifsDMP037N7B9k8fcRbJWskG', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiOFJZS3Rkc2s1RFhuaGFHZEFaR2t4QkRuVWdmV0UzYmZmYlZpbUdiRCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7czoxNDoiY2FwdGNoYV9yZXN1bHQiO2k6MTg7fQ==', 1751620596);

-- ----------------------------
-- Table structure for sliders
-- ----------------------------
DROP TABLE IF EXISTS `sliders`;
CREATE TABLE `sliders`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `caption` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sliders
-- ----------------------------
INSERT INTO `sliders` VALUES (1, 'Kopi', 'sliders/cwwVqqlFaTBaanOhRBDb7CNW7kXplIOoiKXG5YTS.png', 'Ini Kopi torabika', 1, '2025-07-03 08:44:12', '2025-07-03 09:00:50');
INSERT INTO `sliders` VALUES (2, 'Slider 2', 'sliders/d82Uoe9bzr0kxSNm7zm86C5NULgaFi5EgRh9Koha.jpg', 'Ini Testing 2', 1, '2025-07-03 10:38:46', '2025-07-03 10:38:46');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `users_email_unique`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'Dedik Haryanto', 'dedik.haryanto@gmail.com', NULL, '$2y$12$G8qyH63FVy.nkTnNMty3x.oq1xeCXJ5QpqcODpVR4Z9Jp0berRJM2', NULL, '2025-07-03 04:21:19', '2025-07-03 04:21:19');

SET FOREIGN_KEY_CHECKS = 1;
